const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');


let offset = 10000;
let limit = 100;
let totalItemsToFetch = 15000
const apiUrl = 'https://api.blockchair.com/bitcoin/addresses';

let allData = []
const fileName = 'data.txt';

async function fetchDataAndSaveToFile() {
    try {
        const urlWithParams = `${apiUrl}?offset=${offset}&limit=${limit}`;
        const response = await axios.get(urlWithParams);
        let resArray = response?.data?.data
        if(!resArray.length ) return
        for (let index = 0; index < resArray.length; index++) {
            let dataToAppend = await resArray[index].address
            if (`${dataToAppend}`.startsWith("1")) {
                allData.push(dataToAppend)
                const fileContent = fs.readFileSync(fileName, 'utf8');
                if (!fileContent) {
                    fs.writeFile(fileName, dataToAppend, (err) => {
                        if (err) {
                          // Handle write error
                          console.error('Error writing data to the file:', err);
                        }
                        return
                      });
                }
                fs.appendFile(fileName,'\n'+ dataToAppend, (err) => {
                    if (err) {
                        console.error('Error appending data to the file:', err);
                    }
                    return
                });
            }
        }

    } catch (error) {
        console.log(error);
    }
}


async function chunkFectch() {
    let count = 0;
    cron.schedule('*/9 * * * * *', async () => {
        console.log('Fetching data in chunks...');
        if (offset < totalItemsToFetch) {
            await fetchDataAndSaveToFile();
            offset += limit;
            count += 1
            console.log(count);
        }
    });
    console.log(allData.length);

}

chunkFectch();
