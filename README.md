# PCSO 2D Lotto Generator

[![License](https://img.shields.io/github/license/warengonzaga/pcso-2d-lotto-generator)](https://github.com/warengonzaga/pcso-2d-lotto-generator/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/warengonzaga/pcso-2d-lotto-generator)](https://github.com/warengonzaga/pcso-2d-lotto-generator/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/warengonzaga/pcso-2d-lotto-generator)](https://github.com/warengonzaga/pcso-2d-lotto-generator/network/members)

A mobile-first web application for generating PCSO 2D lotto number combinations with buffer system and Rambolito mode support. Perfect for Filipino lotto players looking to optimize their number combinations.

## Features

- **PCSO 2D Number Range (0-31)** - Official Philippine lotto number range
- **Buffer System (0-2)** - Automatically generate nearby number variations
- **Rambolito Mode** - Position-independent winning combinations
- **Live Cost Monitoring** - Real-time bet amount calculation (₱20 per combination)
- **Multiple Combinations** - Add unlimited number combinations
- **Export Options** - Copy to clipboard or download as text file
- **Mobile-First Design** - Optimized for mobile devices with dark mode theme
- **No Backend Required** - Runs entirely in your browser (client-side)

## Quick Start

### Online (GitHub Pages)

Visit the live version at: **https://warengonzaga.github.io/pcso-2d-lotto-generator**

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/warengonzaga/pcso-2d-lotto-generator.git
   cd pcso-2d-lotto-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## How It Works

### Buffer Logic

The buffer system generates nearby number variations based on your settings:

- **Buffer 0**: Exact number only
- **Buffer 1**: Original number ± 1 variation
- **Buffer 2**: Original number ± 2 variations

### Rambolito Mode

Rambolito mode determines how positions are handled:

| Mode | Buffer | Behavior |
|------|--------|----------|
| **Checked** | Any | Position doesn't matter (7-26 = 26-7) |
| **Unchecked** | 0 | Exact position only |
| **Unchecked** | ≥1 | Auto-corrects position (includes reversals) |

### Output Format

Generated combinations follow this format:
```
07 26 20 R
```
- First number: **07**
- Second number: **26**
- Amount: **20** (in pesos)
- Rambolito flag: **R** (if enabled)

## Usage Example

1. Enter your two lucky numbers (0-31)
2. Set your bet amount per combination (default: ₱20)
3. Choose buffer level (0-2)
4. Check/uncheck Rambolito mode
5. Add more combinations if needed
6. Click "Generate Numbers"
7. Copy or download your combinations

## Tech Stack

- **Backend:** Node.js with Express
- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks)
- **Theme:** Dark mode with neon purple/violet aesthetic
- **Hosting:** GitHub Pages (static frontend)

## Project Structure

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
├── AGENTS.md                  # AI agent instructions
├── LICENSE                    # GPL-3.0 License
└── README.md
```

## Contributing

Contributions are welcome! This project follows the [Clean Commit Convention](https://github.com/wgtechlabs/clean-commit) by @wgtechlabs.

### Commit Format

```
<emoji> <type>: <description>
```

**Example:**
```bash
📦 new: add export to CSV feature
🔧 update: improve buffer calculation
🐛 fix: correct rambolito logic
📖 docs: update readme with examples
```

See `.github/copilot-instructions.md` and `AGENTS.md` for detailed guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the clean-commit convention
4. Test thoroughly on mobile and desktop
5. Commit your changes (`git commit -m '📦 new: add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request to `main` branch

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Author

Created by **Waren Gonzaga**

- GitHub: [@warengonzaga](https://github.com/warengonzaga)
- Website: [warengonzaga.com](https://warengonzaga.com)

## Disclaimer

This tool is for entertainment and convenience purposes only. Please play responsibly. The author is not responsible for any losses incurred from using this application. Gambling can be addictive - seek help if needed.

## Support

If you find this project helpful, please consider:

- Giving it a star on GitHub
- Sharing it with fellow lotto players
- Contributing improvements
- Reporting issues or bugs

---

Made with ❤️ for Filipino lotto players
