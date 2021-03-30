require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '!';

client.on('ready', () => {
  console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const [command, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
