# GitHub Copilot Instructions

## Clean Commit Convention

This project follows the **Clean Commit Convention** by [@wgtechlabs](https://github.com/wgtechlabs/clean-commit).

> "Clean Code deserves Clean Commit" — a minimalist git workflow emphasizing simplicity, visual clarity, and universal applicability.

### Commit Message Format

**Basic:**
```
<emoji> <type>: <description>
```

**With Scope:**
```
<emoji> <type> (<scope>): <description>
```

### The Nine Commit Types

| Emoji | Type | Purpose |
|-------|------|---------|
| 📦 | `new` | Introducing features, files, or capabilities |
| 🔧 | `update` | Modifying existing code, refactoring, enhancements |
| 🗑️ | `remove` | Deleting code, files, features, or dependencies |
| 🔒 | `security` | Fixing vulnerabilities and security patches |
| ⚙️ | `setup` | Configuring projects, CI/CD, tooling, build systems |
| ☕ | `chore` | Routine maintenance, dependency updates, housekeeping |
| 🧪 | `test` | Adding, modifying, or fixing test coverage |
| 📖 | `docs` | Documentation changes and content updates |
| 🚀 | `release` | Version releases and preparation activities |

### Formatting Rules

- **Case:** Lowercase for type identifiers
- **Tense:** Present tense ("add" rather than "added")
- **Punctuation:** No trailing periods
- **Length:** Descriptions limited to 72 characters maximum

### Scope Guidelines

Scopes are optional but valuable in larger projects:
- Component names: `header`, `footer`, `generator`
- Module identifiers: `api`, `server`, `client`
- Feature domains: `buffer`, `rambolito`, `output`

Keep scopes concise, lowercase, and consistent.

### Examples

```bash
📦 new: add buffer system for number variations
🔧 update (generator): improve rambolito logic
📖 docs: add usage guide for help section
⚙️ setup: configure express server
🧪 test (buffer): add unit tests for edge cases
```

### When Contributing

All commits must follow this convention. Use the appropriate emoji and type for your changes to maintain consistency and clarity throughout the project's history.
