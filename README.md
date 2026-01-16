# 🎰 Lotto Number Generator

A mobile-first Node.js web application for generating PCSO 2D lotto number combinations with an intelligent buffer system. Generate multiple number variations and export them in the standard lotto format.

## Features

- **Mobile-First Design**: Optimized for mobile devices with responsive desktop support
- **Buffer System**: Generate number variations automatically
- **Rambolito Mode**: Position-independent winning combinations
- **Multiple Combinations**: Add as many number combinations as you need
- **Export Options**: Copy to clipboard or download as `.txt` file
- **Clean Output Format**: `01 02 20 R` (number-number-amount-rambolito)

## How Buffer System Works

### With Rambolito (Position Doesn't Matter)
When Rambolito is selected, no additional combinations are generated because position doesn't matter. The original combination already covers all variations.

**Example:**
- Input: 1, 2 with Buffer = 1, Rambolito = ✓
- Output: `01 02 20 R` (only one line)

### Without Rambolito (Exact Position)
When Rambolito is NOT selected, the buffer generates all +/- variations to cover exact positions.

**Example:**
- Input: 1, 2 with Buffer = 1, Rambolito = ✗
- Output:
  ```
  00 02 20
  01 01 20
  01 02 20
  01 03 20
  02 02 20
  ```

The buffer adds/subtracts values from each number independently (within 0-31 range for PCSO 2D).

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Enter your number combinations:
   - **Number 1 & 2**: Enter PCSO 2D numbers between 0-31
   - **Amount**: Bet amount in PHP (default: 20)
   - **Buffer**: Set buffer value (0-2)
   - **Rambolito**: Check if position doesn't matter

4. Click **"Add Combination"** to add more number sets

5. Click **"Generate Numbers"** to create the output

6. Use **"Copy to Clipboard"** or **"Download"** to save your numbers

## Output Format

Each line follows this format:
```
01 02 20 R
```

- First two digits: First number (padded to 2 digits)
- Next two digits: Second number (padded to 2 digits)
- Amount: Bet amount in PHP
- R: Rambolito flag (omitted if not Rambolito)

## Technical Details

### Project Structure
```
lotto-number-generator/
├── package.json
├── .gitignore
├── server.js                 # Express server
├── public/
│   ├── index.html           # Main HTML page
│   ├── css/
│   │   └── style.css        # Mobile-first styles
│   └── js/
│       ├── app.js           # UI logic
│       └── generator.js     # Core buffer logic
└── README.md
```

### Technology Stack
- **Backend**: Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **No Build Tools**: Simple and straightforward

### Buffer Algorithm

The buffer system generates combinations based on this logic:

```javascript
// Rambolito: No additional combinations
if (isRambolito) {
  return [[num1, num2]];
}

// Exact: Generate all +/- buffer variations
for (let i = -buffer; i <= buffer; i++) {
  for (let j = -buffer; j <= buffer; j++) {
    const newNum1 = num1 + i;
    const newNum2 = num2 + j;
    // Only include if within 0-31 range (PCSO 2D)
    if (newNum1 >= 0 && newNum1 <= 31 && newNum2 >= 0 && newNum2 <= 31) {
      combinations.add([newNum1, newNum2]);
    }
  }
}
```

## Development

To modify the application:

1. **Generator Logic**: Edit `public/js/generator.js` for buffer calculations
2. **UI Logic**: Edit `public/js/app.js` for form interactions
3. **Styling**: Edit `public/css/style.css` for appearance
4. **Layout**: Edit `public/index.html` for structure

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## License

MIT License

## Contributing

Feel free to submit issues or pull requests for improvements.

---

Made with ❤️ for lotto enthusiasts
