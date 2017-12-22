const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (bot, message, args) => {
  let toGet = message.guild.member(message.mentions.users.first())
  if (!toGet) return message.reply('You did not specify a user mention!');
  let Got = request(`https://discorddatabasejech.000webhostapp.com/Users/${toGet.id}.json`, { json: true },(err, res, body) => {
      if (err){ return console.log(err);}
        let obj = JSON.parse(JSON.stringify(body))
        let usnm = obj.Username;
        if (obj.verifycode !== 'Verified') return message.reply('This user is not verified!');
         var Embed = new Discord.RichEmbed()
         .setTitle('Player Information for: ')
         .addField(usnm,'')
         .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=${usnm}`)
         .setColor(0x154360);
         message.channel.sendEmbed(Embed);

});
}

module.exports.help = {
    name: "whois",
    info: "Gets roblox username for a discord member.",
    Args: "[METION]"
}
