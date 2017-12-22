module.exports.run = async (bot, message, args) => {
    var saythis = message.content.slice(5,message.content.length);
    message.channel.send(saythis);
    message.delete();



}

module.exports.help = {
    name: "say",
    info: "Says whatever the bot is commanded to say.",
    Args: "[STRING]"
}
