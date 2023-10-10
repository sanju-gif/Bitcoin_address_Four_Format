const axios = require('axios');
const fs = require('fs');

const chunkSize = 10; // Maximum allowed by the API
const totalItemsToFetch = 21; // Total number of items you want to fetch
let offset = 0;
let fetchedItems = 0;

async function fetchDataAndProcessChunk(apiUrl, offset,fileName) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        offset:offset,
        limit: chunkSize
      }
    });

    const dataChunk = response.data;
    // processChunk(dataChunk);

    const dataString = JSON.stringify(dataChunk, null, 2);
    // Save the data to a text file
    fs.writeFileSync(fileName, dataString);

    return dataChunk.length; // Return the number of items in this chunk
  } catch (error) {
    console.error('Error fetching data:', error);
    return 0; // Return 0 items if there was an error
  }
}

function processChunk(chunk) {
  // Modify this function to process the chunk as needed
  // For demonstration, let's just log the chunk
  console.log('Processing chunk:', chunk);
}

async function fetchAndSaveData(apiUrl, totalItemsToFetch, fileName) {
  try {

    while (fetchedItems < totalItemsToFetch) {
      const itemsInChunk = await fetchDataAndProcessChunk(apiUrl, offset, fileName);
      if (itemsInChunk === 0) break; // Exit the loop if an error occurred
    console.log(fetchedItems);
      fetchedItems += itemsInChunk;
      offset += chunkSize;
    }

    console.log('Total items fetched:', fetchedItems);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Replace with your API URL
// const apiUrl = 'https://api.example.com/data';
const apiUrl = 'https://api.blockchair.com/bitcoin/addresses'; 
const fileName = 'data.txt';
// Fetch and save the data
fetchAndSaveData(apiUrl, totalItemsToFetch, fileName);
