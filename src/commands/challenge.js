const getUserFromMention = require('../utils/getUserFromMention');

module.exports = {
  name: 'challenge',
  description: 'Challenge another user to a ladder match.',
  guildOnly: true,
  syntax: '!challenge <user>',
  execute(message, args, client) {
    if (!args.length) {
      return message.reply('you gotta @ someone to challenge them.');
    } else if (args.length > 1) {
      return message.reply(
        "slow your roll partner. Why don't you do some more Art of War before challenging multiple people at once?",
      );
    } else if (getUserFromMention(client, args[0]) === message.author) {
      return message.reply(
        'why are you challenging yourself? Take a 60 second break and try again later.',
      );
    }

    const challengee = getUserFromMention(client, args[0]);

    return message.channel.send(
      `${message.author} has challenged ${challengee}'s ladder spot! Respond with *!accept* or *!decline*.`,
    );
  },
};
