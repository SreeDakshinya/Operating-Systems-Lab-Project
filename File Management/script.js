document.getElementById("fileForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    let totalBlocks = parseInt(document.getElementById("totalBlocks").value);
    let startAddress = parseInt(document.getElementById("startAddress").value);
    let fileSize = parseInt(document.getElementById("fileSize").value);
    let fileName = document.getElementById("fileName").value;
  
    // Initialize flag to true
    let flag = true;
  
    // Check if the start address and file size are within the block limits
    if (startAddress < 0 || startAddress + fileSize - 1 >= totalBlocks) {
      flag = false;
    } else {
      // Check if the blocks are already used
      for (let i = startAddress; i < startAddress + fileSize; i++) {
        if (blocks[i]) {
          flag = false;
          break;
        }
      }
    }
  
    if (flag) {
      // Update the blocks status for the new file
      for (let i = startAddress; i < startAddress + fileSize; i++) {
        blocks[i] = true;
      }
      // Add the file to the directory
      directory.push({ file_name: fileName, start: startAddress, size: fileSize });
      alert("File is inserted\n\n");
      // Clear form inputs
      document.getElementById("fileName").value = "";
      document.getElementById("startAddress").value = "";
      document.getElementById("fileSize").value = "";
    } else {
      alert("File is not inserted\n\n");
      // Clear form inputs
      document.getElementById("fileName").value = "";
      document.getElementById("startAddress").value = "";
      document.getElementById("fileSize").value = "";
    }
  
    // Display directory table
    displayDirectory();
  });
  
  // Function to display directory table
  function displayDirectory() {
    let output = document.getElementById("output");
    let table = "<h3>Directory Table:</h3><table border='1'><tr><th>File Name</th><th>Start Address</th><th>Size</th></tr>";
    for (let i = 0; i < directory.length; i++) {
      table += "<tr>";
      table += "<td>" + directory[i].file_name + "</td>";
      table += "<td>" + directory[i].start + "</td>";
      table += "<td>" + directory[i].size + "</td>";
      table += "</tr>";
    }
    table += "</table>";
    output.innerHTML = table;
  }
  
  // Initialize directory array
  let directory = [];
  // Initialize blocks array
  let blocks = [];
  // Initialize totalBlocks variable
  let totalBlocks = 0;
  
  // Function to set the total number of blocks
  function setTotalBlocks() {
    totalBlocks = parseInt(document.getElementById("totalBlocks").value);
    // Initialize blocks array with totalBlocks number of elements, all set to false initially
    blocks = new Array(totalBlocks).fill(false);
  }
  
  // Event listener for changes in the totalBlocks input field
  document.getElementById("totalBlocks").addEventListener("change", setTotalBlocks);
  