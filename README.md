# Agent Template (AG Kit)

Starter repository pre-configured with **AG Kit** — an autonomous multi-agent and skills framework for **Google Antigravity IDE** and **Gemini CLI**.

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
│   ├── skills/            # On-demand domain skills (53 skills)
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
│   └── manifest.json      # AG Kit component manifest
├── .gitignore
├── package.json           # Toolkit verification & ast-grep runner
└── README.md
```

---

## 🚀 How to Use This Template

### Option 1: Use as a New Project Base
1. Clone or copy this repository:
   ```bash
   git clone <your-repo-url> my-new-project
   cd my-new-project
   ```
2. Initialize your project code inside this folder. The `.agents` directory will automatically be recognized by Antigravity IDE.

### Option 2: Add AG Kit to an Existing Project
Copy the `.agents/` folder directly to the root of your existing project:
```powershell
Copy-Item -Path .\path\to\agent-template\.agents -Destination .\path\to\your-project\.agents -Recurse
```

---

## 🤖 Highlights
- **22 Specialized Agents**: Orchestrator, System Architect, UI/UX Designer, Frontend, Backend, DevOps, Security, Database, QA, and more.
- **Multi-Perspective Squad Alignment**: `/party` command convenes PM, UX, Architect, and Dev to reach consensus before code is written.
- **5 Phase Gate Checklists**: Quality criteria between Requirements, Architecture, Design, Dev, and QA.
- **AST Code Intelligence**: Integrated `ast-grep` (Tree-sitter AST) and `ast_outline.py` for structural refactoring and 90% token savings.
- **Git Intelligence & Safety**: Automated `/commit` workflow enforcing Conventional Commits with scope and secret prevention.
- **Dynamic Skill Loading**: 53 modular skills loaded strictly on-demand.
- **Anti-Slop UI Standards**: Design spec tokens, contrast ratios, and Swap-Test validation.
- **Cross-Session Memory**: Retain architectural decisions and coding preferences across sessions.
