#!/usr/bin/env python3
# Run: python3 scraper.py
"""
Job scraper for Abhyankar Sharma's job portal.
Pulls live jobs from RemoteOK and We Work Remotely (no API keys needed).
Run: python scraper.py
Then open the portal: python -m http.server 8080
"""

import json
import requests
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
import time
import re

JOBS_FILE = Path(__file__).parent / "jobs.json"

# Keywords matching Abhyankar's profile
TITLE_KEYWORDS = [
    "systems engineer", "solutions engineer", "business analyst", "systems analyst",
    "technical program manager", "program manager", "implementation consultant",
    "solutions consultant", "test engineer", "qa engineer", "quality assurance",
    "requirements engineer", "business intelligence analyst", "bi analyst",
    "data analyst", "product operations", "technical analyst", "business systems",
    "process analyst", "process engineer", "it analyst", "technical business analyst",
    "product analyst", "validation engineer", "test manager", "project manager"
]

TAG_KEYWORDS = [
    "sdlc", "jira", "agile", "scrum", "sql", "python", "requirements",
    "test management", "validation", "bi", "tableau", "power bi",
    "business analysis", "stakeholder", "data modeling"
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}


def matches_profile(title: str, tags: list[str]) -> bool:
    title_lower = title.lower()
    tags_lower = [t.lower() for t in tags]
    if any(kw in title_lower for kw in TITLE_KEYWORDS):
        return True
    if any(kw in tags_lower for kw in TAG_KEYWORDS):
        return True
    return False


def fetch_remoteok() -> list[dict]:
    print("Fetching RemoteOK...")
    try:
        resp = requests.get("https://remoteok.com/api", headers=HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        jobs = []
        for item in data[1:]:  # first item is metadata
            if not isinstance(item, dict):
                continue
            title = item.get("position", "")
            tags = item.get("tags") or []
            if not matches_profile(title, tags):
                continue
            date_str = item.get("date", "")
            try:
                dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
                date_fmt = dt.strftime("%Y-%m-%d")
            except Exception:
                date_fmt = datetime.now().strftime("%Y-%m-%d")

            jobs.append({
                "id": f"rok_{item.get('id', '')}",
                "title": title,
                "company": item.get("company", "Unknown"),
                "location": "Remote",
                "type": "Full-time",
                "salary": item.get("salary", ""),
                "url": item.get("url") or f"https://remoteok.com/l/{item.get('slug','')}",
                "tags": [t.title() for t in tags[:8]],
                "description": re.sub(r"<[^>]+>", "", item.get("description", ""))[:400],
                "date": date_fmt,
                "source": "RemoteOK"
            })
        print(f"  Found {len(jobs)} matching jobs on RemoteOK")
        return jobs
    except Exception as e:
        print(f"  RemoteOK error: {e}")
        return []


def fetch_wwr_feed(feed_url: str, category: str) -> list[dict]:
    try:
        resp = requests.get(feed_url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        root = ET.fromstring(resp.content)
        ns = {"content": "http://purl.org/rss/1.0/modules/content/"}
        jobs = []
        channel = root.find("channel")
        if channel is None:
            return []
        for item in channel.findall("item"):
            title_el = item.find("title")
            link_el = item.find("link")
            pub_el = item.find("pubDate")
            desc_el = item.find("description")

            title = title_el.text if title_el is not None else ""
            # WWR titles are "Company: Job Title"
            if ": " in title:
                company, job_title = title.split(": ", 1)
            else:
                company, job_title = "Unknown", title

            if not matches_profile(job_title, [category]):
                continue

            url = link_el.text if link_el is not None else ""
            raw_desc = desc_el.text if desc_el is not None else ""
            description = re.sub(r"<[^>]+>", "", raw_desc)[:400]

            pub_date = ""
            if pub_el is not None and pub_el.text:
                try:
                    from email.utils import parsedate_to_datetime
                    dt = parsedate_to_datetime(pub_el.text)
                    pub_date = dt.strftime("%Y-%m-%d")
                except Exception:
                    pub_date = datetime.now().strftime("%Y-%m-%d")

            slug = re.sub(r"[^a-z0-9]", "_", job_title.lower())[:30]
            jobs.append({
                "id": f"wwr_{slug}_{hash(url) % 99999:05d}",
                "title": job_title.strip(),
                "company": company.strip(),
                "location": "Remote",
                "type": "Full-time",
                "salary": "",
                "url": url,
                "tags": [category, "Remote", "Full-time"],
                "description": description.strip(),
                "date": pub_date,
                "source": "WeWorkRemotely"
            })
        return jobs
    except Exception as e:
        print(f"  WWR feed error ({category}): {e}")
        return []


def fetch_wwr() -> list[dict]:
    print("Fetching We Work Remotely...")
    feeds = [
        ("https://weworkremotely.com/categories/remote-management-and-finance-jobs.rss", "Management"),
        ("https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss", "Engineering"),
        ("https://weworkremotely.com/categories/remote-back-end-programming-jobs.rss", "Backend"),
        ("https://weworkremotely.com/categories/remote-data-science-jobs.rss", "Data Science"),
    ]
    all_jobs = []
    for url, cat in feeds:
        jobs = fetch_wwr_feed(url, cat)
        all_jobs.extend(jobs)
        time.sleep(0.5)
    print(f"  Found {len(all_jobs)} matching jobs on WeWorkRemotely")
    return all_jobs


def load_existing() -> list[dict]:
    if JOBS_FILE.exists():
        with open(JOBS_FILE) as f:
            return json.load(f)
    return []


def merge_jobs(existing: list[dict], new_jobs: list[dict]) -> list[dict]:
    existing_ids = {j["id"] for j in existing}
    curated = [j for j in existing if j.get("source") == "Curated"]
    live_existing = [j for j in existing if j.get("source") != "Curated"]

    added = 0
    for job in new_jobs:
        if job["id"] not in existing_ids:
            live_existing.append(job)
            existing_ids.add(job["id"])
            added += 1

    # Sort live jobs by date descending
    live_existing.sort(key=lambda j: j.get("date", ""), reverse=True)
    print(f"  Added {added} new live jobs (kept {len(curated)} curated)")
    return curated + live_existing


def main():
    print("=" * 50)
    print("Job Portal Scraper — starting")
    print("=" * 50)

    existing = load_existing()
    print(f"Loaded {len(existing)} existing jobs")

    live_jobs = []
    live_jobs.extend(fetch_remoteok())
    live_jobs.extend(fetch_wwr())

    merged = merge_jobs(existing, live_jobs)

    with open(JOBS_FILE, "w") as f:
        json.dump(merged, f, indent=2)

    print(f"\nDone! {len(merged)} total jobs saved to jobs.json")
    print("Now run: python -m http.server 8080")
    print("Then open: http://localhost:8080")


if __name__ == "__main__":
    main()
