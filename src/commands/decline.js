module.exports = {
  name: 'decline',
  description: 'Declines a ladder match challenge.',
  guildOnly: true,
  syntax: '!decline <reason>',
  execute(message, args) {
    message.channel.send('Pong.');
  },
};
