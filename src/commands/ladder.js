const axios = require('axios');
const profiles = require('../../profiles');
const { GOOGLE_API_KEY, SHEETS_ID } = process.env;

module.exports = {
  name: 'ladder',
  description: 'Display the ladder for all to see.',
  guildOnly: true,
  syntax: '!ladder',
  async execute(message) {
    const {
      data: { values },
    } = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Ranking!A2:B100?key=${GOOGLE_API_KEY}`,
    );

    for (const player in profiles) {
      const { data: soloStats } = await axios.get(
        `https://aoe2.net/api/player/ratinghistory?game=aoe2de&leaderboard_id=3&profile_id=${profiles[player].id}&count=1`,
      );

      const { data: teamStats } = await axios.get(
        `https://aoe2.net/api/player/ratinghistory?game=aoe2de&leaderboard_id=4&profile_id=${profiles[player].id}&count=1`,
      );

      for (const sheetsPlayer in values) {
        if (values[sheetsPlayer][1] === player) {
          soloStats[0] &&
            values[sheetsPlayer].push(`1s - ${soloStats[0].rating}`);
          teamStats[0] &&
            values[sheetsPlayer].push(`Team - ${teamStats[0].rating}`);
        }
      }
    }

    const rankings = values
      .map((rank) => {
        const playerRanking = rank.slice(0, 2).join('. ');
        const playerRating = rank.slice(2).join(' | ');
        return playerRating
          ? `${playerRanking} (${playerRating})`
          : playerRanking;
      })
      .join('\n');

    return message.channel.send(rankings);
  },
};
