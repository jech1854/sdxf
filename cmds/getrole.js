const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (bot, message, args) => {
var w = request(`https://discorddatabasejech.000webhostapp.com/Guilds/${message.guild.id}.json`, { json: true },(err, res, body) => {
  var obj = JSON.parse(JSON.stringify(body));
  var group = obj.group;
  if (group === 0) return message.reply('You have not linked a group');
var war = request(`https://discorddatabasejech.000webhostapp.com/Users/${message.author.id}.json`, { json: true },(err, res, body) => {
        if (err) { return message.reply('**You are not verified, please link your account.**');}
        if (err){ return console.log(err);}
           let obj = JSON.parse(JSON.stringify(body));
           let userid = obj.userid;
           var role = rbx.getRankNameInGroup(group,userid).then(function(data){
            let NewRole = message.guild.roles.find("name", data)
            message.member.addRole(NewRole.id);
            var Embed = new Discord.RichEmbed()
            .setTitle('Success')
            .setDescription('**You Now have the rank of **' + data)
            .setColor(0x154360);
            message.channel.sendEmbed(Embed);
        });
 });
});
}

module.exports.help = {
    name: "getrole",
    info: "Gives you the corresponding role to the linked group in the discord.",
    Args: "-"
}
