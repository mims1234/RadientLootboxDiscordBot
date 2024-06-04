const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available commands',
    async execute(interaction) {
        const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

        const fields = [];
        for (const file of commandFiles) {
            const command = require(`../slashCommands/${file}`);
            fields.push(`**${command.name}** - *${command.description}*`);
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .addFields([
                { name: 'List of Commands', value: fields.join('\n') }
            ]);

        embed.setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL()
        });

        await interaction.reply({ embeds: [embed] });
    },
};