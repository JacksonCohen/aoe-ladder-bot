module.exports = {
  name: 'accept',
  description: 'Ping!',
  guildOnly: true,
  execute(message, args) {
    message.channel.send('Pong.');
  },
};
