/**
 * Lotto Number Generator - Core Logic
 * Handles buffer calculations and output formatting
 */

/**
 * Generate buffered combinations based on input parameters
 * @param {number} num1 - First number (0-31)
 * @param {number} num2 - Second number (0-31)
 * @param {number} buffer - Buffer value (0-2)
 * @param {boolean} isRambolito - Whether Rambolito mode is enabled
 * @returns {Array<Array<number>>} Array of [num1, num2] combinations
 */
function generateBufferedCombinations(num1, num2, buffer, isRambolito) {
  const variations = new Set();

  // With Rambolito: Add/subtract buffer to each number independently
  // Example: 7,26 buffer=1 → 6,26 | 7,26 | 8,26 | 7,25 | 7,27
  if (isRambolito) {
    // Add original
    variations.add(`${num1},${num2}`);

    // Add buffer variations for num1 (keeping num2 same)
    for (let i = -buffer; i <= buffer; i++) {
      if (i === 0) continue; // Skip original
      const newNum1 = num1 + i;
      if (newNum1 >= 0 && newNum1 <= 31) {
        variations.add(`${newNum1},${num2}`);
      }
    }

    // Add buffer variations for num2 (keeping num1 same)
    for (let j = -buffer; j <= buffer; j++) {
      if (j === 0) continue; // Skip original
      const newNum2 = num2 + j;
      if (newNum2 >= 0 && newNum2 <= 31) {
        variations.add(`${num1},${newNum2}`);
      }
    }

    return Array.from(variations).map(v => v.split(',').map(Number));
  }

  // Without Rambolito (exact mode)
  // If buffer = 0: Only exact combination (no auto-correction needed)
  // If buffer >= 1: Generate buffered combinations AND their reversals (auto-correct position)

  if (buffer === 0) {
    // Exact combination only, no variations needed
    return [[num1, num2]];
  }

  // Buffer >= 1: Generate all buffered combinations with position reversals
  const baseVariations = new Set();

  // Generate buffer variations for num1
  baseVariations.add(`${num1},${num2}`);
  for (let i = -buffer; i <= buffer; i++) {
    if (i === 0) continue;
    const newNum1 = num1 + i;
    if (newNum1 >= 0 && newNum1 <= 31) {
      baseVariations.add(`${newNum1},${num2}`);
    }
  }

  // Generate buffer variations for num2
  for (let j = -buffer; j <= buffer; j++) {
    if (j === 0) continue;
    const newNum2 = num2 + j;
    if (newNum2 >= 0 && newNum2 <= 31) {
      baseVariations.add(`${num1},${newNum2}`);
    }
  }

  // Add all base variations and their reversals (auto-correct position)
  baseVariations.forEach(combo => {
    const [n1, n2] = combo.split(',').map(Number);
    variations.add(`${n1},${n2}`); // Original
    variations.add(`${n2},${n1}`); // Reversed
  });

  return Array.from(variations).map(v => v.split(',').map(Number));
}

/**
 * Format a single combination as output string
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {number} amount - Bet amount
 * @param {boolean} isRambolito - Whether Rambolito mode is enabled
 * @returns {string} Formatted output line (e.g., "01 02 20 R")
 */
function formatCombination(num1, num2, amount, isRambolito) {
  // Pad numbers to 2 digits
  const paddedNum1 = String(num1).padStart(2, '0');
  const paddedNum2 = String(num2).padStart(2, '0');

  // Format: "01 02 20 R" or "01 02 20"
  const rambolitoFlag = isRambolito ? ' R' : '';
  return `${paddedNum1} ${paddedNum2} ${amount}${rambolitoFlag}`;
}

/**
 * Generate all output lines for a single user combination input
 * @param {Object} combination - User input combination
 * @returns {Array<string>} Array of formatted output lines
 */
function generateOutputForCombination(combination) {
  const { num1, num2, amount, buffer, isRambolito } = combination;

  // Generate buffered combinations
  const bufferedCombinations = generateBufferedCombinations(num1, num2, buffer, isRambolito);

  // Format each combination
  return bufferedCombinations.map(([n1, n2]) =>
    formatCombination(n1, n2, amount, isRambolito)
  );
}

/**
 * Calculate total cost for all combinations
 * @param {Array<Object>} combinations - Array of user input combinations
 * @returns {Object} Object with totalCombinations and totalCost
 */
function calculateTotalCost(combinations) {
  let totalCombinations = 0;
  let totalCost = 0;

  for (const combination of combinations) {
    const { num1, num2, amount, buffer, isRambolito } = combination;
    const bufferedCombinations = generateBufferedCombinations(num1, num2, buffer, isRambolito);
    const count = bufferedCombinations.length;

    totalCombinations += count;
    totalCost += count * amount;
  }

  return { totalCombinations, totalCost };
}

/**
 * Generate complete output for all user combinations
 * @param {Array<Object>} combinations - Array of user input combinations
 * @returns {string} Complete formatted output with newlines, total, and timestamp
 */
function generateCompleteOutput(combinations) {
  const allLines = [];

  for (const combination of combinations) {
    const lines = generateOutputForCombination(combination);
    allLines.push(...lines);
  }

  // Calculate totals
  const { totalCombinations, totalCost } = calculateTotalCost(combinations);

  // Add divider and footer
  const divider = '-------';
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // Get version from global variable (set by app.js)
  const version = typeof appVersion !== 'undefined' && appVersion ? `v${appVersion}` : '';
  const versionLine = version ? `PCSO 2D Lotto Generator ${version}` : '';

  allLines.push('');
  allLines.push(divider);
  allLines.push(`Total Combinations: ${totalCombinations}`);
  allLines.push(`Total Amount: ₱${totalCost.toLocaleString()}`);
  allLines.push(`Generated: ${timestamp}`);
  if (versionLine) {
    allLines.push(versionLine);
  }

  return allLines.join('\n');
}
