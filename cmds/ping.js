module.exports.run = async (bot, message, args) => {
    message.channel.send('Pong!');



}

module.exports.help = {
    name: "ping",
    info: "Replys 'Pong' ",
    Args: "-"
}
