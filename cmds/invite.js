module.exports.run = async (bot, message, args) => {
    bot.generateInvite(['ADMINISTRATOR'])
  .then(link => {
    message.channel.send(link);
  });



}

module.exports.help = {
    name: "invite",
    info: "Gives you and invite link to invite my bot.",
    Args: "-"
}
