module.exports = {
  name: 'history',
  description: 'Displays the matchup history between two players.',
  guildOnly: true,
  syntax: '!history <user1> <user2>',
  execute(message, args) {
    message.channel.send('Pong.');
  },
};
