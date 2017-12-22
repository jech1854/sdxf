const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');
const Sentencer = require('sentencer');

module.exports.run = async (bot, message, args) => {
    var usnm = message.content.slice(13,message.content.length);
    if (!usnm) {
      var sendthiss = new Discord.RichEmbed()
      .setTitle('Invalid command Use')
      .addField('Correct usage','`!linkaccount [Username]` without the brackets or in other words `[]`')
      .setColor(0x154360);
      message.reply('');
      message.channel.sendEmbed(sendthiss);
      return
    }
    var body = Sentencer.make("{{ noun }} {{ noun }} {{ noun }} {{ noun }} {{ noun }} {{ noun }}");
    var sendthis = new Discord.RichEmbed()
    .setTitle('Linking your account')
    .setDescription('To link Your account you must  go to your roblox status and paste this code into it. \n `' + body+'`')
    .setFooter('When your done type !verify')
    .setColor(0x154360);
    message.reply('');
    message.channel.sendEmbed(sendthis);
      var settoken = request(`https://discorddatabasejech.000webhostapp.com/Users/saveuser.php?id=${message.author.id}&vc=${body}&usnm=${usnm}&usid=${null}`, { json: true },(err, res, b0dy) => {
        console.log('Verification Token Set.')
      });
}

module.exports.help = {
    name: "linkaccount",
    info: "Explains how to link your roblox account to the database.",
    Args: "[ROBLOX USERNAME]"
}
