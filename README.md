# Agent Template

Starter repository pre-configured with an autonomous multi-agent and skills framework for **Claude Code**, **Cursor**, **Codex**, **VS Code (Copilot)**, **Google Antigravity** and **Gemini CLI**.

> **One kit, many IDEs.** `.agents/` is the single source of truth. Pick your IDE(s) and Agent Kit generates the matching files:
>
> | `--target` | IDE | Generated files |
> | --- | --- | --- |
> | `claude` | Claude Code | `CLAUDE.md`, `.claude/{agents,skills,commands,settings.json}`, `.mcp.json` |
> | `cursor` | Cursor | `.cursor/rules/*.mdc`, `.cursor/commands/`, `.cursor/mcp.json` |
> | `codex` | Codex | `AGENTS.md` |
> | `vscode` | VS Code (GitHub Copilot) | `.github/{copilot-instructions.md,prompts,agents}`, `.vscode/mcp.json` |
> | `antigravity` | Google Antigravity / Gemini CLI | nothing extra — `.agents/` is native |
>
> ```bash
> npx @trongtin1/agent-template init --target claude,cursor   # or --target all; omit for an interactive menu
> npx @trongtin1/agent-template sync --target vscode          # add another IDE later
> ```
>
> Generated files are never hand-edited: change `.agents/`, then run `npm run sync:targets` (or `update`, which re-syncs your chosen IDEs). Existing files that Agent Kit did not generate are never overwritten.

---

## 📁 Repository Structure

```text
agent-template/
├── .agents/
│   ├── agent/             # Specialized Agent Personas (24 agents)
│   │   ├── orchestrator.md
│   │   ├── system-architect.md     # System Architecture & ADR
│   │   ├── ui-ux-designer.md       # Anti-slop UI/UX & Design Tokens
│   │   ├── frontend-specialist.md
│   │   ├── backend-specialist.md
│   │   ├── devops-engineer.md
│   │   ├── project-planner.md
│   │   └── ...
│   ├── skills/            # On-demand domain skills (55 skills)
│   │   ├── find-skills/            # Discover & install skills from skills.sh ecosystem
│   │   ├── git-master/             # Conventional Commits & safe Git practices
│   │   ├── advanced-elicitation/   # Deep requirement discovery & edge cases
│   │   ├── silent-failure-hunter/  # Swallowed error elimination
│   │   ├── clean-code/
│   │   ├── app-builder/
│   │   ├── frontend-design/
│   │   ├── api-patterns/
│   │   └── ...
│   ├── checklists/        # Phase Gate quality criteria (5 gates)
│   │   ├── 01-requirements-gate.md
│   │   ├── 02-architecture-gate.md
│   │   ├── 03-ui-ux-gate.md
│   │   ├── 04-development-gate.md
│   │   └── 05-qa-verification-gate.md
│   ├── workflows/         # Guided workflows & slash commands (16 workflows)
│   │   ├── commit.md (/commit)     # Automated safe Git commit with scope
│   │   ├── party.md (/party)       # 4-role consensus squad alignment
│   │   ├── worklog.md (/worklog)   # Daily session audit log
│   │   ├── create.md (/create)
│   │   ├── plan.md (/plan)
│   │   ├── orchestrate.md (/orchestrate)
│   │   ├── debug.md (/debug)
│   │   └── ...
│   ├── scripts/           # Zero-dependency utilities (code_outline.py, worklog.py)
│   ├── output-styles/     # Communication styles (Vietnamese & English concise)
│   ├── rules/             # Workspace rules & core protocols
│   ├── memory/            # Persistent cross-session memory index
│   └── manifest.json      # Component manifest
├── docs/                  # Project documentation & MCP Guide
├── .gitignore
├── package.json           # Toolkit verification & scripts
└── README.md
```

---

## 🚀 Quick Start

### Option 1: Use GitHub Template (Recommended)

Click **"Use this template"** on GitHub to create a new repo pre-loaded with all agent files — no cloning needed.

### Option 2: Install into an Existing Project

Add the `.agents/` layer into any existing project without touching your code:

```bash
npx @trongtin1/agent-template init
```

This only installs the `.agents/` directory — your project files are untouched. No global install required.

### Option 3: Clone as a New Project Base

```bash
git clone https://github.com/trongtin1/agent-template my-new-project
cd my-new-project
```

Open `my-new-project/` in your IDE and run `npx /agent-template init --target <ide>`.

---

## 🔄 Updating

Keep your `.agents/` layer up to date without touching your project code:

```bash
# Preview what will change
npx @trongtin1/agent-template update --dry-run

# Apply the update
npx @trongtin1/agent-template update
```

The update is **merge-aware**: it creates a backup before changing managed files and never silently overwrites files you have modified locally.

---

## ✅ Verify the Workspace

After setup, confirm everything is working:

```bash
npm run check:agents       # Validate .agents structure
npm run check:runtime  # Runtime integration check (read-only)
npm run test:runtime   # Run regression tests
```

Then open the project in your IDE and confirm:

1. Slash commands like `/plan`, `/commit`, `/orchestrate` are discovered.
2. Skills are loaded from `.agents/skills/`.
3. Run `npm test` and confirm it is allowed by the safety hook.

### Verify the safety hook

```bash
printf '%s' '{"tool_args":{"CommandLine":"rm -rf /"}}' \
  | node .agents/hooks/validate-tool-call.mjs
```

The command must exit non-zero and print `BLOCKED`.

---

## ⚠️ Important: Do Not Gitignore `.agents/`

Do **not** add `.agents/` to your project's `.gitignore`. Your IDE needs to index rules, skills, and workflows from this directory.

If you want to keep `.agents/` local without disabling discovery, add it to `.git/info/exclude` instead:

```bash
echo ".agents/" >> .git/info/exclude
```

---

## 🔌 External Integrations & MCP Guide

Agent Kit is engineered to work **100% out of the box with ZERO required external tools or MCPs**. All MCPs and integrations are strictly optional:

- **Built-in Core Tools (Zero pip/npm install)**: `code_outline.py` (structural AST outline), `worklog.py` (daily session tracking).
- **Optional MCPs**:
  - `context7`: Upstash documentation MCP for live library docs.
  - `codegraph`: Semantic code intelligence for large repos.
  - `playwright`: Headless Chromium E2E testing.

📖 **For detailed setup, configuration steps, and agent fallback behavior, read [docs/MCP_GUIDE.md](docs/MCP_GUIDE.md).**

---

## 🤖 Highlights
- **24 Specialized Agents**: Orchestrator, System Architect, UI/UX Designer, Frontend, Backend, DevOps, Security, Database, QA, and more.
- **Multi-Perspective Squad Alignment**: `/party` command convenes PM, UX, Architect, and Dev to reach consensus before code is written.
- **5 Phase Gate Checklists**: Quality criteria between Requirements, Architecture, Design, Dev, and QA.
- **Structural Code Intelligence**: Integrated zero-dependency `code_outline.py` for token-efficient symbol extraction (saving up to 90% tokens).
- **AI Relay Baton & Surgical Context**: Built-in cross-session task continuity (`task_on_progress.md`) and surgical inspection gate.
- **Git Intelligence & Safety**: Automated `/commit` workflow enforcing Conventional Commits with scope and secret prevention.
- **Dynamic Skill Loading**: 55 modular skills loaded strictly on-demand.
- **Anti-Slop UI Standards**: Design spec tokens, contrast ratios, and Swap-Test validation.
- **Cross-Session Memory & Worklog**: Retain architectural decisions across sessions with daily audit logs (`docs/worklog/`).
