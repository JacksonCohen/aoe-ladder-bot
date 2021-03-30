const axios = require('axios');
const { GOOGLE_API_KEY, SHEETS_ID } = process.env;

module.exports = {
  name: 'ladder',
  description: 'Display the ladder for all to see.',
  guildOnly: true,
  async execute(message) {
    const { data } = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Ranking!A2:B100?key=${GOOGLE_API_KEY}`,
    );
    const rankings = data.values.map((rank) => rank.join('. ')).join('\n');
    return message.channel.send(rankings);
  },
};
