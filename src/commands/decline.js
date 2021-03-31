module.exports = {
  name: 'decline',
  description: 'Ping!',
  guildOnly: true,
  execute(message, args) {
    message.channel.send('Pong.');
  },
};
