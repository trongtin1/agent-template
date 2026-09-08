# Agent Template

Starter repository pre-configured with an autonomous multi-agent and skills framework for **Google Antigravity IDE** and **Gemini CLI**.

---

## 📁 Repository Structure

```text
agent-template/
├── .agents/
│   ├── agent/             # Specialized Agent Personas (22 agents)
│   │   ├── orchestrator.md
│   │   ├── system-architect.md     # System Architecture & ADR
│   │   ├── ui-ux-designer.md       # Anti-slop UI/UX & Design Tokens
│   │   ├── frontend-specialist.md
│   │   ├── backend-specialist.md
│   │   ├── devops-engineer.md
│   │   ├── project-planner.md
│   │   └── ...
│   ├── skills/            # On-demand domain skills (54 skills)
│   │   ├── find-skills/            # Discover & install skills from skills.sh ecosystem
│   │   ├── git-master/             # Conventional Commits & safe Git practices
│   │   ├── ast-grep/               # Tree-sitter AST structural search & outline
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
│   ├── workflows/         # Guided workflows & slash commands (15 workflows)
│   │   ├── commit.md (/commit)     # Automated safe Git commit with scope
│   │   ├── party.md (/party)       # 4-role consensus squad alignment
│   │   ├── create.md (/create)
│   │   ├── plan.md (/plan)
│   │   ├── orchestrate.md (/orchestrate)
│   │   ├── debug.md (/debug)
│   │   └── ...
│   ├── output-styles/     # Communication styles (Vietnamese & English concise)
│   ├── rules/             # Workspace rules & core protocols
│   ├── memory/            # Persistent cross-session memory index
│   └── manifest.json      # Component manifest
├── .gitignore
├── package.json           # Toolkit verification & ast-grep runner
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

Open `my-new-project/` in Antigravity IDE — the `.agents/` directory is discovered automatically.

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
npm run check:antigravity  # Antigravity integration check (read-only)
npm run test:antigravity   # Run regression tests
```

Then open the project in Antigravity IDE and confirm:

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

Do **not** add `.agents/` to your project's `.gitignore`. Antigravity needs to index rules, skills, and workflows from this directory.

If you want to keep `.agents/` local without disabling discovery, add it to `.git/info/exclude` instead:

```bash
echo ".agents/" >> .git/info/exclude
```

---

## 🤖 Highlights
- **22 Specialized Agents**: Orchestrator, System Architect, UI/UX Designer, Frontend, Backend, DevOps, Security, Database, QA, and more.
- **Multi-Perspective Squad Alignment**: `/party` command convenes PM, UX, Architect, and Dev to reach consensus before code is written.
- **5 Phase Gate Checklists**: Quality criteria between Requirements, Architecture, Design, Dev, and QA.
- **AST Code Intelligence**: Integrated `ast-grep` (Tree-sitter AST) and `ast_outline.py` for structural refactoring and 90% token savings.
- **Git Intelligence & Safety**: Automated `/commit` workflow enforcing Conventional Commits with scope and secret prevention.
- **Dynamic Skill Loading**: 54 modular skills loaded strictly on-demand.
- **Anti-Slop UI Standards**: Design spec tokens, contrast ratios, and Swap-Test validation.
- **Cross-Session Memory**: Retain architectural decisions and coding preferences across sessions.
