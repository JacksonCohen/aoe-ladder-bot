module.exports = {
  name: 'accept',
  description: 'Accepts a ladder match challenge.',
  guildOnly: true,
  syntax: '!accept',
  execute(message, args) {
    message.channel.send('Pong.');
  },
};
