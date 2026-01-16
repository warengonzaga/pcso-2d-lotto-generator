/**
 * Lotto Number Generator - UI Logic
 * Handles user interactions, form management, and output display
 */

let combinationCount = 0;
let appVersion = null;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add first combination row
  addCombinationRow();

  // Set up event listeners
  document.getElementById('addCombinationBtn').addEventListener('click', addCombinationRow);
  document.getElementById('generateBtn').addEventListener('click', generateOutput);
  document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
  document.getElementById('printBtn').addEventListener('click', printOutput);
  document.getElementById('downloadBtn').addEventListener('click', downloadOutput);
  document.getElementById('exportBtn').addEventListener('click', exportBackup);
  document.getElementById('clearOutputBtn').addEventListener('click', clearOutput);
  document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });
  document.getElementById('importFile').addEventListener('change', importBackup);

  // Initial cost update
  updateCostMonitor();

  // Fetch and display app version
  fetchAppVersion();
});

/**
 * Add a new combination row to the form
 */
function addCombinationRow() {
  combinationCount++;

  const container = document.getElementById('combinationsContainer');
  const row = document.createElement('div');
  row.className = 'combination-row';
  row.id = `combination-${combinationCount}`;

  row.innerHTML = `
    <div class="combination-header">
      <h3>Combination ${combinationCount}</h3>
    </div>
    <div class="input-group">
      <div class="input-field">
        <label for="num1-${combinationCount}">Number 1</label>
        <div class="num-input-wrapper">
          <div class="lotto-ball" data-ball-id="num1-${combinationCount}">
            <input type="number" id="num1-${combinationCount}" class="num-input" min="0" max="31" value="0" required>
          </div>
        </div>
      </div>
      <div class="input-field">
        <label for="num2-${combinationCount}">Number 2</label>
        <div class="num-input-wrapper">
          <div class="lotto-ball" data-ball-id="num2-${combinationCount}">
            <input type="number" id="num2-${combinationCount}" class="num-input" min="0" max="31" value="0" required>
          </div>
        </div>
      </div>
    </div>
    <div class="input-group">
      <div class="input-field">
        <label for="amount-${combinationCount}">Amount (PHP)</label>
        <input type="number" id="amount-${combinationCount}" class="amount-input" min="1" value="20" required>
      </div>
      <div class="input-field">
        <label for="buffer-${combinationCount}">Buffer</label>
        <input type="number" id="buffer-${combinationCount}" class="buffer-input" min="0" max="2" value="0" required>
      </div>
    </div>
    <div class="checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" id="rambolito-${combinationCount}" class="rambolito-checkbox" checked>
        <span>Rambolito</span>
      </label>
    </div>
    ${combinationCount > 1 ? `<button type="button" class="remove-btn" onclick="removeCombination(${combinationCount})">Remove</button>` : ''}
  `;

  container.appendChild(row);

  // Assign random colors to the lotto balls
  assignRandomBallColors(combinationCount);

  // Add input validation
  addInputValidation(combinationCount);

  // Update cost monitor
  updateCostMonitor();
}

/**
 * Assign random colors to lotto balls
 */
function assignRandomBallColors(id) {
  const ballColors = ['ball-red', 'ball-blue', 'ball-yellow', 'ball-green', 'ball-orange', 'ball-pink', 'ball-purple', 'ball-cyan'];
  
  const ball1 = document.querySelector(`[data-ball-id="num1-${id}"]`);
  const ball2 = document.querySelector(`[data-ball-id="num2-${id}"]`);
  
  if (ball1 && ball2) {
    // Get two different random colors
    const color1 = ballColors[Math.floor(Math.random() * ballColors.length)];
    let color2 = ballColors[Math.floor(Math.random() * ballColors.length)];
    
    // Ensure the second ball has a different color
    while (color2 === color1) {
      color2 = ballColors[Math.floor(Math.random() * ballColors.length)];
    }
    
    ball1.classList.add(color1);
    ball2.classList.add(color2);
  }
}

/**
 * Add input validation to ensure values stay within valid ranges
 */
function addInputValidation(id) {
  const num1 = document.getElementById(`num1-${id}`);
  const num2 = document.getElementById(`num2-${id}`);
  const amount = document.getElementById(`amount-${id}`);
  const buffer = document.getElementById(`buffer-${id}`);
  const rambolito = document.getElementById(`rambolito-${id}`);

  // Ensure numbers stay 0-31 (PCSO 2D range)
  [num1, num2].forEach(input => {
    input.addEventListener('input', (e) => {
      if (e.target.value < 0) e.target.value = 0;
      if (e.target.value > 31) e.target.value = 31;
      updateCostMonitor();
    });
  });

  // Ensure buffer stays 0-2
  buffer.addEventListener('input', (e) => {
    if (e.target.value < 0) e.target.value = 0;
    if (e.target.value > 2) e.target.value = 2;
    updateCostMonitor();
  });

  // Update cost when amount changes
  amount.addEventListener('input', () => {
    updateCostMonitor();
  });

  // Update cost when rambolito changes
  rambolito.addEventListener('change', () => {
    updateCostMonitor();
  });
}

/**
 * Remove a combination row
 */
function removeCombination(id) {
  const row = document.getElementById(`combination-${id}`);
  if (row) {
    row.remove();
    updateCostMonitor();
  }
}

/**
 * Update the live cost monitor with current totals
 */
function updateCostMonitor() {
  const combinations = collectCombinations();

  if (combinations.length === 0) {
    document.getElementById('totalCombinations').textContent = '0';
    document.getElementById('totalCost').textContent = '₱0';
    return;
  }

  const { totalCombinations, totalCost } = calculateTotalCost(combinations);

  document.getElementById('totalCombinations').textContent = totalCombinations;
  document.getElementById('totalCost').textContent = `₱${totalCost.toLocaleString()}`;
}

/**
 * Collect all combination data from the form
 */
function collectCombinations() {
  const combinations = [];
  const rows = document.querySelectorAll('.combination-row');

  rows.forEach(row => {
    const id = row.id.split('-')[1];
    const num1 = parseInt(document.getElementById(`num1-${id}`).value);
    const num2 = parseInt(document.getElementById(`num2-${id}`).value);
    const amount = parseInt(document.getElementById(`amount-${id}`).value);
    const buffer = parseInt(document.getElementById(`buffer-${id}`).value);
    const isRambolito = document.getElementById(`rambolito-${id}`).checked;

    // Validate inputs
    if (isNaN(num1) || isNaN(num2) || isNaN(amount) || isNaN(buffer)) {
      return;
    }

    combinations.push({ num1, num2, amount, buffer, isRambolito });
  });

  return combinations;
}

/**
 * Generate output and display it
 */
function generateOutput() {
  const combinations = collectCombinations();

  if (combinations.length === 0) {
    alert('Please add at least one valid combination.');
    return;
  }

  // Generate the output using generator.js functions
  const output = generateCompleteOutput(combinations);

  // Display the output
  const outputArea = document.getElementById('outputArea');
  outputArea.value = output;

  // Show output section
  document.getElementById('outputSection').style.display = 'block';

  // Scroll to output
  outputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Copy output to clipboard
 */
function copyToClipboard() {
  const outputArea = document.getElementById('outputArea');
  outputArea.select();
  outputArea.setSelectionRange(0, 99999); // For mobile devices

  try {
    document.execCommand('copy');
    showCopyFeedback('Copied to clipboard!');
  } catch (err) {
    showCopyFeedback('Failed to copy. Please copy manually.');
  }
}

/**
 * Print output
 */
function printOutput() {
  const outputArea = document.getElementById('outputArea');
  const text = outputArea.value;

  if (!text) {
    alert('No output to print.');
    return;
  }

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  const versionText = appVersion ? `v${appVersion}` : '';
  const generatedDate = new Date().toLocaleString();
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PCSO 2D Lotto Numbers</title>
      <style>
        body {
          font-family: 'Courier New', monospace;
          margin: 20px;
          padding: 0;
          background: white;
          color: black;
        }
        .print-content {
          white-space: pre-wrap;
          font-size: 12pt;
          line-height: 1.6;
          margin-bottom: 120px;
        }
        .print-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 9pt;
          padding: 15px 10px;
          border-top: 1px solid #ccc;
          background: white;
        }
        .print-footer p {
          margin: 3px 0;
        }
        .print-footer .version-info {
          font-size: 8pt;
          color: #666;
        }
        @media print {
          .print-footer {
            position: fixed;
            bottom: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="print-content">${text}</div>
      <div class="print-footer">
        <p><strong>Generated by PCSO 2D Lotto Generator</strong></p>
        <p class="version-info">Version: ${versionText}</p>
        <p class="version-info">Generated on: ${generatedDate}</p>
        <p>https://warengonzaga.github.io/pcso-2d-lotto-generator</p>
        <p><em>Play responsibly. For entertainment purposes only.</em></p>
      </div>
    </body>
    </html>
  `);
  
  printWindow.document.close();
  
  // Wait for content to load then trigger print
  printWindow.onload = function() {
    printWindow.print();
  };
  
  showCopyFeedback('Opening print dialog...');
}

/**
 * Download output as text file
 */
function downloadOutput() {
  const outputArea = document.getElementById('outputArea');
  const text = outputArea.value;

  if (!text) {
    alert('No output to download.');
    return;
  }

  // Create blob and download
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lotto-numbers-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showCopyFeedback('Downloaded!');
}

/**
 * Clear the generated output and hide the output section
 */
function clearOutput() {
  const outputSection = document.getElementById('outputSection');
  const outputArea = document.getElementById('outputArea');
  
  // Clear the textarea
  outputArea.value = '';
  
  // Hide the output section with a fade effect
  outputSection.style.display = 'none';
  
  // Show feedback
  showCopyFeedback('Output cleared!');
}

/**
 * Show feedback message for copy/download actions
 */
function showCopyFeedback(message) {
  const copyBtn = document.getElementById('copyBtn');
  const originalText = copyBtn.textContent;
  copyBtn.textContent = message;
  setTimeout(() => {
    copyBtn.textContent = originalText;
  }, 2000);
}

/**
 * Export combinations with metadata for backup
 */
function exportBackup() {
  const outputArea = document.getElementById('outputArea');
  const generatedOutput = outputArea.value;

  if (!generatedOutput) {
    alert('No output to export. Please generate numbers first.');
    return;
  }

  // Collect current combinations data
  const combinations = collectCombinations();

  if (combinations.length === 0) {
    alert('No combinations to export.');
    return;
  }

  // Create metadata object
  const metadata = {
    version: appVersion || '1.0',
    appVersion: appVersion,
    exportDate: new Date().toISOString(),
    appUrl: 'https://warengonzaga.github.io/pcso-2d-lotto-generator',
    combinations: combinations
  };

  // Create export content
  const versionText = appVersion ? `v${appVersion}` : 'v1.0';
  const exportContent = `## PCSO 2D LOTTO GENERATOR - BACKUP FILE ##
## DO NOT EDIT THIS SECTION ##
## METADATA_START ##
${JSON.stringify(metadata, null, 2)}
## METADATA_END ##

## GENERATED OUTPUT ##
${generatedOutput}

## END OF FILE ##
Generated by: PCSO 2D Lotto Generator
Version: ${versionText}
URL: https://warengonzaga.github.io/pcso-2d-lotto-generator
Export Date: ${new Date().toLocaleString()}
`;

  // Download the backup file
  const blob = new Blob([exportContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lotto-backup-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showCopyFeedback('Backup exported!');
}

/**
 * Import combinations from backup file
 */
function importBackup(event) {
  const file = event.target.files[0];
  
  if (!file) {
    return;
  }

  const reader = new FileReader();
  
  reader.onload = function(e) {
    const content = e.target.result;
    
    try {
      // Extract metadata
      const metadataStart = content.indexOf('## METADATA_START ##');
      const metadataEnd = content.indexOf('## METADATA_END ##');
      
      if (metadataStart === -1 || metadataEnd === -1) {
        alert('Invalid backup file format. Please select a valid backup file exported from this app.');
        return;
      }
      
      const metadataJson = content.substring(
        metadataStart + '## METADATA_START ##'.length,
        metadataEnd
      ).trim();
      
      const metadata = JSON.parse(metadataJson);
      
      if (!metadata.combinations || !Array.isArray(metadata.combinations)) {
        alert('Invalid backup file: No combinations data found.');
        return;
      }
      
      // Clear existing combinations
      const container = document.getElementById('combinationsContainer');
      container.innerHTML = '';
      combinationCount = 0;
      
      // Restore combinations
      metadata.combinations.forEach(combo => {
        combinationCount++;
        
        const row = document.createElement('div');
        row.className = 'combination-row';
        row.id = `combination-${combinationCount}`;
        
        row.innerHTML = `
          <div class="combination-header">
            <h3>Combination ${combinationCount}</h3>
          </div>
          <div class="input-group">
            <div class="input-field">
              <label for="num1-${combinationCount}">Number 1</label>
              <div class="num-input-wrapper">
                <div class="lotto-ball" data-ball-id="num1-${combinationCount}">
                  <input type="number" id="num1-${combinationCount}" class="num-input" min="0" max="31" value="${combo.num1}" required>
                </div>
              </div>
            </div>
            <div class="input-field">
              <label for="num2-${combinationCount}">Number 2</label>
              <div class="num-input-wrapper">
                <div class="lotto-ball" data-ball-id="num2-${combinationCount}">
                  <input type="number" id="num2-${combinationCount}" class="num-input" min="0" max="31" value="${combo.num2}" required>
                </div>
              </div>
            </div>
          </div>
          <div class="input-group">
            <div class="input-field">
              <label for="amount-${combinationCount}">Amount (PHP)</label>
              <input type="number" id="amount-${combinationCount}" class="amount-input" min="1" value="${combo.amount}" required>
            </div>
            <div class="input-field">
              <label for="buffer-${combinationCount}">Buffer</label>
              <input type="number" id="buffer-${combinationCount}" class="buffer-input" min="0" max="2" value="${combo.buffer}" required>
            </div>
          </div>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" id="rambolito-${combinationCount}" class="rambolito-checkbox" ${combo.isRambolito ? 'checked' : ''}>
              <span>Rambolito</span>
            </label>
          </div>
          ${combinationCount > 1 ? `<button type="button" class="remove-btn" onclick="removeCombination(${combinationCount})">Remove</button>` : ''}
        `;
        
        container.appendChild(row);
        
        // Assign random colors to the lotto balls
        assignRandomBallColors(combinationCount);
        
        // Add input validation
        addInputValidation(combinationCount);
      });
      
      // Update cost monitor
      updateCostMonitor();
      
      // Clear the file input
      event.target.value = '';
      
      const importVersion = metadata.appVersion ? `v${metadata.appVersion}` : 'unknown';
      alert(`Successfully imported ${metadata.combinations.length} combination(s) from backup!\nExported on: ${new Date(metadata.exportDate).toLocaleString()}\nVersion: ${importVersion}`);
      
    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to import backup file. Please ensure the file is a valid backup exported from this app.');
    }
  };
  
  reader.onerror = function() {
    alert('Failed to read file. Please try again.');
  };
  
  reader.readAsText(file);
}

/**
 * Fetch and display app version from package.json
 */
async function fetchAppVersion() {
  try {
    // Try fetching from static version.json first (for GitHub Pages)
    let response = await fetch('version.json');
    
    // If version.json doesn't exist, try the API endpoint (for local server)
    if (!response.ok) {
      response = await fetch('/api/version');
    }
    
    if (response.ok) {
      const data = await response.json();
      
      // Store version globally for use in outputs
      appVersion = data.version;
      
      const versionElement = document.getElementById('appVersion');
      if (versionElement && data.version) {
        versionElement.textContent = `v${data.version}`;
      }
    }
  } catch (error) {
    console.error('Failed to fetch app version:', error);
  }
}

