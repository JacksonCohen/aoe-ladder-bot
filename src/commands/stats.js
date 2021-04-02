const axios = require('axios');
const profiles = require('../../profiles');
const getUserFromMention = require('../utils/getUserFromMention');

module.exports = {
  name: 'stats',
  description: 'Get stats for a player',
  guildOnly: true,
  async execute(message, args, client) {
    const user = getUserFromMention(client, args[0]);
    const username = user
      ? profiles[user.username]
      : profiles[message.author.username];
    const arg0 = args[0] && args[0].toLowerCase();
    const arg1 = args[1] && args[1].toLowerCase();

    if (!username) {
      return message.channel.send('The user could not be found.');
    }
    if (!arg1 && arg0 !== '1s' && arg0 !== 'team') {
      console.log('1');
      return message.channel.send('Please specify *1s* or *team*.');
    }
    if (user && arg1 !== '1s' && arg1 !== 'team') {
      console.log('2');
      return message.channel.send('Please specify *1s* or *team*.');
    }

    if (arg0 === '1s' || arg1 === '1s') {
      const { data: stats } = await axios.get(
        `https://aoe2.net/api/player/ratinghistory?game=aoe2de&leaderboard_id=3&profile_id=${username.id}&count=1`,
      );

      const result = stats
        ? `__${username.username} 1s Stats__
      Rating: ${stats[0].rating}
      Wins: ${stats[0].num_wins}
      Losses: ${stats[0].num_losses}
      Win Streak: ${stats[0].streak}
      `
        : 'No stats found.';
      return message.channel.send(result);
    } else if (arg0 === 'team' || arg1 === 'team') {
      const { data: stats } = await axios.get(
        `https://aoe2.net/api/player/ratinghistory?game=aoe2de&leaderboard_id=4&profile_id=${username.id}&count=1`,
      );

      const result = stats
        ? `__${username.username} Team Stats__
      Rating: ${stats[0].rating}
      Wins: ${stats[0].num_wins}
      Losses: ${stats[0].num_losses}
      Win Streak: ${stats[0].streak}
      `
        : 'No stats found.';
      return message.channel.send(result);
    }
  },
};
