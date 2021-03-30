module.exports = {
  name: 'challenge',
  description: 'Challenge another user to a ladder match.',
  guildOnly: true,
  execute(message, args) {
    if (args.length < 2) {
      return message.reply('you gotta @ someone to challenge them.');
    } else if (args.length > 2) {
      return message.reply(
        "slow your roll partner. Why don't you do some more Art of War before challenging multiple people at once?",
      );
    }

    const users = message.mentions.users.map((user) => user.username);
    return message.channel.send(
      `${users[0]} has challenged ${users[1]}'s ladder spot! You have 24 hours to !accept or !decline.`,
    );
  },
};
