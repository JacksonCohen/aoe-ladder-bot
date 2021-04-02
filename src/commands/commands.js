const fs = require('fs');

module.exports = {
  name: 'commands',
  description: 'Lists all available commands.',
  guildOnly: true,
  syntax: '!commands',
  execute(message) {
    const commandFiles = fs.readdirSync('./src/commands');
    const commandSyntaxes = commandFiles.map((file) => {
      const command = require(`./${file}`);
      if (Object.keys(command).length) {
        return `\`${command.syntax}\` - ${command.description}`;
      }
    });

    const result = commandSyntaxes.filter((command) => command).join('\n');
    message.channel.send(result);
  },
};
