# 🛡️ Security Policy & Threat Model

> Antigravity-first safety guarantees, execution boundaries, and vulnerability disclosure for AG Kit.

---

## 🔒 Security Architecture & Guarantees

AG Kit operates under a **defense-in-depth model** combining Antigravity IDE host permissions, safety hooks, and strict operational protocols:

```text
Host / OS Boundary (Windows / Linux / macOS)
  └── Antigravity IDE Permissions & Workspace Trust
        └── AG Kit PreToolUse Hook (validate-tool-call.mjs)
              └── User Approval Gate (Git State Mutation)
                    └── Agent Execution Context
```

---

## 🛑 Native Safety Hooks (`PreToolUse`)

AG Kit includes a native hook configured in `.agents/hooks.json` that intercepts `run_command` before execution:

- **Destructive File System Deletions**: Blocks patterns such as `rm -rf /`, `rm -rf /*`, `rm -rf /etc`, `rm -rf /usr`, and Windows `rmdir /s /q C:\`.
- **Drive Formatting**: Blocks `format C:`, `mkfs.ext4`, `mkfs.*`, `fdisk`, and raw block device overwrites (`dd if=/dev/zero of=/dev/sd*`).
- **Scoped Cleanup Allowed**: Normal development cleanup commands (such as removing `dist/`, `build/`, `.next/`, or `node_modules/`) are permitted.

To test the hook with a mocked payload safely:
```bash
printf '%s' '{"tool_args":{"CommandLine":"rm -rf /"}}' | node .agents/hooks/validate-tool-call.mjs
```

---

## 🔐 User Approval Gate (Mandatory)

By protocol, the AI agent is strictly forbidden from executing state-changing Git commands autonomously:
- **`git commit`**
- **`git push`**
- **`git checkout -b`**
- **`git reset --hard`**

The agent **MUST** present the file list, proposed diff, and drafted Conventional Commit message, and **WAIT for explicit user confirmation** before running any of these commands.

---

## 🔑 Secret & Sensitive Data Guard

- **Zero Secrets in Memory**: `.agents/memory/` must never store API keys, passwords, database credentials, or tokens.
- **Environment Isolation**: `.env`, `.env.local`, and private certificates are excluded from chat output and commits.
- **Least Privilege**: Workers and subagents operate with bounded tool allowlists and restricted working directories.

---

## 🐛 Reporting a Vulnerability

If you discover a security issue or bypass in AG Kit's hooks or agent boundaries:
1. Do **NOT** open a public GitHub issue.
2. Review the repository security advisory page or contact maintainers privately.
3. Include reproducible steps and tool call payloads.
