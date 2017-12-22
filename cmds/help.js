const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send("**Sliding into your DM's**")
    var Embed = new Discord.RichEmbed()
    .setTitle("Information For Jech's Bot")
    .setDescription(bot.commandlist)
    .setColor(0x154360);
    message.author.sendEmbed(Embed);
    message.author.send("Need any help join this server discord.gg/Sj2NE5z , Have a nice day.")
  


}

module.exports.help = {
    name: "help",
    info: "Shows you commands.",
    Args: "-"
}
