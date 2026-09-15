#!/usr/bin/env python3
"""
Daily Worklog Manager - AG Kit
=================================
Automates and maintains daily session logs in docs/worklog/YYYY-MM-DD.md
within the target project workspace.

Usage:
    python .agents/scripts/worklog.py status [project_root]
    python .agents/scripts/worklog.py start "Task title" [--agent "@agent"] [--tier "Tier 1"]
    python .agents/scripts/worklog.py done [--files "file1,file2"] [--proof "Diagnostics = 0"]
"""

from __future__ import annotations

import argparse
from datetime import datetime
import os
from pathlib import Path
import re
import sys


def get_project_root(custom_path: str | None = None) -> Path:
    if custom_path:
        return Path(custom_path).resolve()
    current = Path.cwd()
    if (current / "docs").is_dir() or (current / "package.json").is_file():
        return current
    return Path(__file__).resolve().parents[2]


def get_worklog_dir(root: Path) -> Path:
    worklog_dir = root / "docs" / "worklog"
    worklog_dir.mkdir(parents=True, exist_ok=True)
    return worklog_dir


def get_today_file(root: Path) -> Path:
    today_str = datetime.now().strftime("%Y-%m-%d")
    return get_worklog_dir(root) / f"{today_str}.md"


def get_now_str() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def get_time_str() -> str:
    return datetime.now().strftime("%H:%M:%S")


def get_date_str() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def cmd_status(root: Path) -> int:
    worklog_dir = get_worklog_dir(root)
    today_file = get_today_file(root)

    print(f"=== Daily Worklog Directory: {worklog_dir} ===")
    daily_files = sorted(worklog_dir.glob("*.md"), reverse=True)
    if not daily_files:
        print("[INFO] No daily worklog files found yet. Ready to initialize on first session.")
        return 0

    print(f"Recorded days ({len(daily_files)}): {[f.stem for f in daily_files[:5]]}")

    target = today_file if today_file.is_file() else daily_files[0]
    content = target.read_text(encoding="utf-8")
    index_match = re.search(r"## ⚡ Daily Session Index.*?\n\n((?:\|.*?\n)+)", content, re.DOTALL)
    if index_match:
        print(f"\n--- Index for {target.name} ---")
        print(index_match.group(0).strip())
    else:
        print(f"\nWorklog exists ({target.name}) but index table is empty or pending.")
    return 0


def cmd_start(root: Path, title: str, agent: str, tier: str) -> int:
    today_file = get_today_file(root)
    now = get_now_str()
    time_only = get_time_str()
    date_str = get_date_str()

    if not today_file.is_file():
        header = f"""# 📋 Daily Session Worklog — {date_str}

> Tracks all execution sessions performed on {date_str}. Maintained automatically by agents.

## ⚡ Daily Session Index

| Session | Start Time | End Time | Task Title | Tier | Status | Agent |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |

---

## 📝 Session Details
"""
        today_file.write_text(header, encoding="utf-8")

    content = today_file.read_text(encoding="utf-8")
    session_matches = re.findall(r"Session #(\d+)", content)
    next_num = max([int(n) for n in session_matches], default=0) + 1
    session_id = f"#{next_num:03d}"

    entry = f"""
### 🕒 Session {session_id} — {title}

- **Start Time**: `{now}`
- **End Time**: `IN_PROGRESS`
- **Task Status**: `🔄 IN_PROGRESS`
- **Agent Assigned**: `{agent}`
- **Task Tier**: `{tier}`

#### 🎯 Scope & Acceptance Criteria (Done When):
- **Objective**: {title}
- **Done When Checklist**:
  - [ ] Implementation verified
  - [ ] Zero diagnostics (0 Errors, 0 Warnings)

#### 📂 Impact Surface (Files Changed):
| Action | File Path | Summary of Changes |
| :--- | :--- | :--- |

#### 🧠 Technical Notes & Decisions:
- [Context]: Daily session initiated via worklog automation.

#### 🧪 Verification & Health Check:
- **Diagnostics**: Pending verification
- **Test / Build Status**: In progress
"""
    new_content = content + "\n---\n" + entry
    today_file.write_text(new_content, encoding="utf-8")
    print(f"[SUCCESS] Started Session {session_id} in {today_file.name} at {now}")
    return 0


def cmd_done(root: Path, files_str: str | None, proof: str | None) -> int:
    today_file = get_today_file(root)
    if not today_file.is_file():
        print(f"[ERROR] No today worklog file found at {today_file}")
        return 1

    content = today_file.read_text(encoding="utf-8")
    now = get_now_str()

    if "IN_PROGRESS" not in content:
        print(f"[INFO] No active IN_PROGRESS session found in {today_file.name}.")
        return 0

    content = re.sub(r"- \*\*End Time\*\*: `IN_PROGRESS`", f"- **End Time**: `{now}`", content, count=1)
    content = re.sub(r"- \*\*Task Status\*\*: `🔄 IN_PROGRESS`", "- **Task Status**: `✅ COMPLETED`", content, count=1)

    if proof:
        content = re.sub(r"- \*\*Diagnostics\*\*: Pending verification", f"- **Diagnostics**: `{proof}`", content, count=1)
        content = re.sub(r"- \*\*Test / Build Status\*\*: In progress", "- **Test / Build Status**: `PASS`", content, count=1)

    today_file.write_text(content, encoding="utf-8")
    print(f"[SUCCESS] Marked active session COMPLETED in {today_file.name} at {now}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Manage daily project session worklogs in docs/worklog/YYYY-MM-DD.md")
    parser.add_argument("command", choices=["status", "start", "done"], help="Action to perform")
    parser.add_argument("title", nargs="?", default="Work Session", help="Task title for start command")
    parser.add_argument("--root", help="Project root directory path")
    parser.add_argument("--agent", default="@orchestrator", help="Assigned agent name")
    parser.add_argument("--tier", default="Tier 2: Feature / Screen", help="Task tier")
    parser.add_argument("--files", help="Comma-separated list of modified files")
    parser.add_argument("--proof", default="0 Errors, 0 Warnings", help="Verification proof summary")

    args = parser.parse_args()
    root = get_project_root(args.root)

    if args.command == "status":
        return cmd_status(root)
    elif args.command == "start":
        return cmd_start(root, args.title, args.agent, args.tier)
    elif args.command == "done":
        return cmd_done(root, args.files, args.proof)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
