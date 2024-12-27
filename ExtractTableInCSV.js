// Function to extract tables and convert to CSV
function extractTablesAsCSV() {
    const tables = document.querySelectorAll("table"); // Select all table elements
    let csvData = "";

    tables.forEach((table, tableIndex) => {
        const rows = table.querySelectorAll("tr");
        csvData += `Table ${tableIndex + 1}\n`; // Add a table header in the CSV

        rows.forEach((row) => {
            const cells = row.querySelectorAll("th, td"); // Get all header and data cells
            const rowData = Array.from(cells)
                .map(cell => `"${cell.textContent.trim()}"`) // Escape cells with quotes for CSV
                .join(","); // Join cells with a comma
            csvData += rowData + "\n"; // Add the row to the CSV
        });

        csvData += "\n"; // Add a blank line between tables
    });

    return csvData;
}

// Download the CSV data as a file
function downloadCSV(csvData, fileName = "tables.csv") {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Usage example: Extract and download tables as CSV
const csvOutput = extractTablesAsCSV();
console.log(csvOutput); // Logs CSV output to the console
downloadCSV(csvOutput);
