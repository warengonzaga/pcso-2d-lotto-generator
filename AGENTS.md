# AI Agent Instructions

This document provides guidelines for AI agents (Claude Code, GitHub Copilot, etc.) working on this project.

## Project Overview

A mobile-first Node.js web application for generating PCSO 2D lotto number combinations with buffer system and Rambolito mode support.

### Tech Stack
- **Backend:** Node.js with Express
- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks)
- **Theme:** Dark mode with neon purple/violet aesthetic

### Key Features
- PCSO 2D number range (0-31)
- Buffer system (0-2) for number variations
- Rambolito mode (position-independent winning)
- Live cost monitoring (₱20 per combination)
- Copy to clipboard and download functionality
- Mobile-first responsive design

## Clean Commit Convention

This project follows the **Clean Commit Convention** by [@wgtechlabs](https://github.com/wgtechlabs/clean-commit).

> "Clean Code deserves Clean Commit"

### Format

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

### Rules

- **Case:** Lowercase for type identifiers
- **Tense:** Present tense ("add" not "added")
- **Punctuation:** No trailing periods
- **Length:** Max 72 characters

### Examples

```bash
📦 new (generator): add buffer system for number variations
🔧 update (ui): improve dark mode contrast
🗑️ remove (deps): remove unused lodash dependency
🔒 security: patch express vulnerability
⚙️ setup: configure prettier and eslint
☕ chore: update dependencies to latest versions
🧪 test (buffer): add edge case tests
📖 docs: update readme with installation steps
🚀 release: version 1.0.0
```

## Code Style Guidelines

### JavaScript
- Use ES6+ features (const/let, arrow functions, destructuring)
- Prefer functional programming patterns
- Use meaningful variable names
- Add comments only for complex logic

### CSS
- Use CSS custom properties (variables) for theming
- Mobile-first approach (min-width media queries)
- BEM-like naming for components
- Keep specificity low

### HTML
- Semantic HTML5 elements
- Accessible form controls with labels
- ARIA attributes where appropriate

## Buffer Logic (Critical)

Understanding the buffer logic is essential when modifying generator.js:

1. **Rambolito Checked:** Generate ±buffer variations for each number independently (no position reversals)
2. **Rambolito Unchecked + Buffer 0:** Output exact combination only
3. **Rambolito Unchecked + Buffer ≥1:** Generate buffered variations AND their position reversals

## File Structure

```
pcso-2d-lotto-generator/
├── .github/
│   └── copilot-instructions.md
├── public/
│   ├── css/
│   │   └── style.css          # Dark theme styles
│   ├── js/
│   │   ├── generator.js       # Core buffer logic
│   │   └── app.js             # UI interactions
│   └── index.html             # Main HTML structure
├── server.js                  # Express server
├── package.json
├── .gitignore
├── AGENTS.md                  # This file
└── README.md
```

## Testing Changes

Before committing:
1. Start server: `npm start`
2. Test on mobile viewport (375px width)
3. Verify buffer logic with different combinations
4. Check cost calculations
5. Test copy/download functionality

## Contributing Workflow

1. Create feature branch from `main`
2. Make changes following code style
3. Test thoroughly
4. Commit using clean-commit convention
5. Push and create pull request

## Common Scopes

- `generator` - Core number generation logic
- `ui` - User interface components
- `server` - Express server configuration
- `buffer` - Buffer system logic
- `rambolito` - Rambolito mode logic
- `theme` - Styling and theming
- `deps` - Dependencies

## Notes for AI Agents

- Always read existing code before modifying
- Maintain consistency with existing patterns
- Respect the mobile-first design approach
- Keep the dark theme aesthetic intact
- Test buffer logic changes carefully
- Use the clean-commit convention for all commits
- Don't over-engineer solutions
- Focus on simplicity and clarity
