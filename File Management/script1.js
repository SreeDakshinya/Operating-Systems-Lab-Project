// Define arrays to store file information
let fileNames = [];
let startAddresses = [];
let endAddresses = [];
let blocksUsed = [];

document.getElementById("fileForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  let totalBlocks = parseInt(document.getElementById("totalBlocks").value);
  let blocks = new Array(totalBlocks).fill(false);

  // Function to check if blocks are already used
  function isBlockUsed(block) {
    return blocks[block];
  }

  // Get form inputs for the new file
  let fileName = document.getElementById("fileName").value;
  let blocksRequired = parseInt(document.getElementById("blocksRequired").value);
  let blockNumbers = document.getElementById("blockNumbers").value.split(',').map(Number);

  // Check if any of the required blocks are out of range or already used
  let invalidBlock = false;
  for (let i = 0; i < blocksRequired; i++) {
    if (blockNumbers[i] < 0 || blockNumbers[i] >= totalBlocks || isBlockUsed(blockNumbers[i])) {
      alert("Invalid block number or block is already used!");
      invalidBlock = true;
      clearFormInputs(); // Clear form inputs
      return;
    }
  }

  if (invalidBlock) return;

  // Check for block conflicts with existing files
  for (let i = 0; i < blocksUsed.length; i++) {
    let existingBlocks = blocksUsed[i];
    for (let j = 0; j < existingBlocks.length; j++) {
      if (blockNumbers.includes(existingBlocks[j])) {
        alert("Block conflict: Two files cannot access the same block!");
        clearFormInputs(); // Clear form inputs
        return;
      }
    }
  }

  // Add the new file information to the arrays
  fileNames.push(fileName);
  startAddresses.push(blockNumbers[0]);
  endAddresses.push(blockNumbers[blocksRequired - 1]);
  blocksUsed.push(blockNumbers);

  // Update blocks status with the new file
  for (let i = 0; i < blocksRequired; i++)
    blocks[blockNumbers[i]] = true;

  // Clear form inputs for the next file
  clearFormInputs();
});

// Function to clear form inputs
function clearFormInputs() {
  document.getElementById("fileName").value = "";
  document.getElementById("blocksRequired").value = "";
  document.getElementById("blockNumbers").value = "";
}

// Function to display directory table
function displayDirectory() {
  let output = document.getElementById("output");
  let table = "<h3>Directory Table:</h3><table border='1'><tr><th>File Name</th><th>Start Address</th><th>End Address</th><th>Blocks Used</th></tr>";
  for (let i = 0; i < fileNames.length; i++) {
    table += "<tr>";
    table += "<td>" + fileNames[i] + "</td>";
    table += "<td>" + startAddresses[i] + "</td>";
    table += "<td>" + endAddresses[i] + "</td>";
    table += "<td>" + blocksUsed[i].join(',') + "</td>";
    table += "</tr>";
  }
  table += "</table>";
  output.innerHTML = table;
}

// Display directory if finish button is clicked
document.getElementById("finishBtn").addEventListener("click", displayDirectory);
