const fs = require('fs');
require('dotenv').config();

const { Client, Collection } = require('discord.js');
const client = new Client();
const { DISCORDJS_BOT_TOKEN } = process.env;
const PREFIX = '!';

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands');
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  client.user.setActivity('Age of Empires II: Definitive Edition');
  console.log(`${client.user.username} has logged in.`);
});

client.on('message', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const [commandName, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply("You trying to get sneaky? You can't DM me commands.");
  }

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(DISCORDJS_BOT_TOKEN);
