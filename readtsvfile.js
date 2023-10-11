const fs = require('fs');

const fileName = 'blockchair_bitcoin_addresses_latest.tsv'; // Replace with the actual TSV file name

try {
  // Read the file content synchronously
  const fileContent = fs.readFileSync(fileName, 'utf8');
  console.log('File content:', fileContent);
} catch (error) {
  // Handle read error
  console.error('Error reading the file:', error);
}


function parseTsvContent(content) {
    const rows = content.split('\n').map(row => row.split('\t'));
    return rows;
}
  
  // Parse the TSV content
  const parsedData = parseTsvContent(fileContent);
  console.log('Parsed TSV data:', parsedData);
  