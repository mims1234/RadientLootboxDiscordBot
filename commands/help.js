const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available commands',
    async execute(message) {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription('Available commands:');

        const fields = [];
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            fields.push(`**${command.name}** - *${command.description}*`);
        }

        embed.addFields([
            { name: 'List of Commands', value: fields.join('\n') }
        ]);

        embed.setFooter({
            text: `Requested by ${message.author.username}`,
            iconURL: message.author.displayAvatarURL()
        });

        message.channel.send({ embeds: [embed] });
    },
};