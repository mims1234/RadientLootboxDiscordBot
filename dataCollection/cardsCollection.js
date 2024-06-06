const axios = require('axios');
const fs = require('fs').promises;

// Check if the JSON file already exists
async function updatePlayerCards() {
  try {
    await fs.access('JSON_Data/playerCards.json');
    // File exists, read the existing data
    const existingData = await fs.readFile('JSON_Data/playerCards.json', 'utf8');
    // Parse the existing data
    const existingPlayerCards = JSON.parse(existingData);
    // Make the API call
    const response = await axios.get('https://valorant-api.com/v1/playercards');
    // Get the data from the response
    const newData = response.data.data;
    // Loop through the new data and update the existing data
    for (const [uuid, card] of Object.entries(existingPlayerCards)) {
      const newCard = newData.find(c => c.uuid === uuid);
      if (newCard) {
        Object.assign(card, {
          displayName: newCard.displayName,
          displayIcon: newCard.displayIcon,
          wideArt: newCard.wideArt,
          smallArt: newCard.smallArt,
          largeArt: newCard.largeArt
        });
      }
    }
    // Write the updated data to a file
    await fs.writeFile('JSON_Data/playerCards.json', JSON.stringify(existingPlayerCards, null, 4));
    console.log('Data saved to JSON_Data/playerCards.json');
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File does not exist, make the API call
      const response = await axios.get('https://valorant-api.com/v1/playercards');
      // Get the data from the response
      const data = response.data.data;
      // Create an empty object to store the data
      const playerCards = {};
      // Loop through the data and extract the relevant information
      data.forEach(card => {
        const uuid = card.uuid;
        playerCards[uuid] = {
          uuid,
          displayName: card.displayName,
          displayIcon: card.displayIcon,
          wideArt: card.wideArt,
          smallArt: card.smallArt,
          largeArt: card.largeArt
        };
      });
      // Write the data to a file
      await fs.writeFile('JSON_Data/playerCards.json', JSON.stringify(playerCards, null, 4));
      console.log('Data saved to JSON_Data/playerCards.json');
    } else {
      console.error('Error:', err);
    }
  }
}

updatePlayerCards();