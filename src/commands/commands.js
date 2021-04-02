const fs = require('fs');

module.exports = {
  name: 'commands',
  description: 'Lists all available commands.',
  guildOnly: true,
  syntax: '!commands',
  execute(message) {
    const commandFiles = fs.readdirSync('./src/commands');
    const commandSyntaxes = commandFiles
      .map((file) => {
        const command = require(`./${file}`);
        return `!${command.name} - \`${command.syntax}\` - ${command.description}`;
      })
      .join('\n');

    message.channel.send(commandSyntaxes);
  },
};
