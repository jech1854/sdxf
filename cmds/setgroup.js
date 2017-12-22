const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');
const fs =  require('fs');

module.exports.run = async (bot, message, args) => {
    let Commander = message.guild.roles.find("name", "Bot Operator")
    if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
    let groupidd = parseInt(message.content.slice(10,message.content.length));
    let guildid = message.guild.id;
    let groupid = parseInt(groupidd);
    let g = request(`https://discorddatabasejech.000webhostapp.com/Guilds/${guildid}.json`, { json: true },(err, res, body) => {
            if (err){ return console.log(err);}
            let username = JSON.stringify(body.username).slice(1,body.username.length+1)
            let password = JSON.stringify(body.password).slice(1,body.password.length+1)
        let wat = request(`https://discorddatabasejech.000webhostapp.com/Guilds/saveguild.php?id=${guildid}&group=${groupid}&username=${username}&password=${password}`, { json: true },(err, res, body) => {
          var groupname = request(`https://api.roblox.com/groups/${groupid}`, { json: true },(err, res, body) => {
              if (err){ return console.log(err); message.reply(err.stack + 'DM Jech#4318 If you get this error.')}
              let obj = JSON.parse(JSON.stringify(body))
              let ngf = body.Name
          var Embed = new Discord.RichEmbed()
          .setTitle('Sucess')
          .setDescription('Your new group is ' + ngf)
          .setColor(0x154360);
          message.channel.sendEmbed(Embed);
        });
      });
    });
}

module.exports.help = {
    name: "setgroup",
    info: "Links a roblox group to the server.",
    Args: "[GROUP ID]"
}
