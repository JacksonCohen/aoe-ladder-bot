const axios = require('axios');
const { GOOGLE_API_KEY, SHEETS_ID } = process.env;

module.exports = {
  name: 'record',
  description: 'Records ladder match in Google Sheet for posterity.',
  guildOnly: true,
  syntax: '!record',
  async execute(message, args) {
    await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Test!A1:B1:append?valueInputOption=USER_ENTERED&key=${GOOGLE_API_KEY}`,
      {
        range: 'Test!A1:B1',
        majorDimension: 'ROWS',
        values: [['Test', 'Test']],
      },
    );

    message.channel.send('Pong.');
  },
};
