const axios = require('axios');
require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const { DISCORDJS_BOT_TOKEN, GOOGLE_API_KEY, SHEETS_ID } = process.env;
const PREFIX = '!';

client.on('ready', () => {
  console.log(`${client.user.username} has logged in.`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const [command, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    const users = message.guild.members.cache.map(({ user }) => user.username);

    switch (command) {
      case 'ladder': {
        const { data } = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Ranking!A2:B100?key=${GOOGLE_API_KEY}`,
        );
        const rankings = data.values.map((rank) => rank.join('. ')).join('\n');
        return message.reply(rankings);
      }
      case 'challenge': {
        if (args.length === 0) {
          return message.reply('you gotta @ someone to challenge them');
        }
        break;
      }
      case 'record': {
        break;
      }
      case 'history': {
        break;
      }
    }
  }
});

client.login(DISCORDJS_BOT_TOKEN);
