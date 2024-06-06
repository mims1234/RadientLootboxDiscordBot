const fs = require('fs');
const axios = require('axios');

async function fetchBuddies() {
    try {
        const response = await axios.get('https://valorant-api.com/v1/buddies');
        const buddies = response.data.data;

        const buddiesFilePath = 'JSON_Data/buddies.json';

        if (!fs.existsSync(buddiesFilePath)) {
            fs.writeFileSync(buddiesFilePath, '{}');
        }

        const existingBuddies = JSON.parse(fs.readFileSync(buddiesFilePath, 'utf8'));

        const newBuddies = {};

        for (const buddy of buddies) {
            const { uuid, displayName, displayIcon } = buddy;
            newBuddies[uuid] = { uuid, displayName, displayIcon };
        }

        const updatedBuddies = { ...existingBuddies, ...newBuddies };

        fs.writeFileSync(buddiesFilePath, JSON.stringify(updatedBuddies, null, 2));

        console.log(`${Object.keys(newBuddies).length} new buddies added to buddies.json`);
    } catch (error) {
        console.error('Error fetching buddies:', error);
    }
}

fetchBuddies();