require("dotenv").config();

const { REST, Routes } = require('discord.js');

const TOKEN = process.env.BOT_KEY;
const CLIENT_ID=process.env.APP_ID
const GUILD_ID=process.env.GUILD_ID

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'help',
    description: 'Replies with list of all commands!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
})()