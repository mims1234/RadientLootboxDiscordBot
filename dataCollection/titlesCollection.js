const axios = require('axios');
const fs = require('fs');
const path = require('path');

// URL of the Valorant API
const url = 'https://valorant-api.com/v1/playertitles';

// Function to fetch data from the API
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

// Function to check if data already exists
const dataExists = (filePath, newData) => {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const uuid in newData) {
    if (existingData[uuid]) {
      return true;
    }
  }

  return false;
};

// Function to process and save data
const processData = async () => {
  try {
    const responseData = await fetchData(url);

    // Extract the necessary fields
    const newTitleCollection = responseData.data.reduce((acc, title) => {
      acc[title.uuid] = {
        uuid: title.uuid,
        displayName: title.displayName,
        textTitle: title.titleText
      };
      return acc;
    }, {});

    // Define the path to save the JSON data
    const filePath = path.join(__dirname, 'JSON_Data', 'titleCollection.json');

    // Check if data already exists
    if (dataExists(filePath, newTitleCollection)) {
      console.log('Data already exists, not updating the file.');
      return;
    }

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(newTitleCollection, null, 2));

    console.log('Data has been saved successfully!');
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

// Call the function to process the data
processData();
