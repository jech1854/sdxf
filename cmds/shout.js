const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');
const rp = require('request-promise');

module.exports.run = async (bot, message, args) => {
    let Commander = message.guild.roles.find("name", "Bot Operator")
    if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
    let shoutthis = message.content.slice(7,message.content.length);
    let guildid = message.guild.id;
    let options = {
     method: 'GET',
     uri: `https://discorddatabasejech.000webhostapp.com/Guilds/${guildid}.json`,
     json: true,
     simple: false
    }
    rp(options)
    .then(function (body) {
      let obj = JSON.parse(JSON.stringify(body));
      console.log(obj);
      let group = obj.group;//JSON.stringify(body.group).slice(1,body.group.length+1);
      if (group === 0) return message.reply('You have not linked a group');
      let username = obj.username;//JSON.stringify(body.username).slice(1,body.username.length+1)
      let password = obj.password;//JSON.stringify(body.password).slice(1,body.password.length+1)
      console.log(username+'-'+password+'-'+group);
      rbx.login(username,password).then(function () {
        rbx.shout(group,shoutthis);
      });

      var Embed = new Discord.RichEmbed()
      .setTitle('Success')
      .setDescription('Shouted `' + shoutthis+'`')
      .setColor(0x154360);
      message.channel.sendEmbed(Embed);
    })
    .catch(function (err) {
       console.log(err.stack);
       var Embed = new Discord.RichEmbed()
      .setTitle('Error')
      .setDescription(err.stack + 'DM Jech#4318 If you Get this Error.')
      .setColor(0x154360);
      message.channel.sendEmbed(Embed);
    });
    
}

module.exports.help = {
    name: "shout",
    info: "Shouts a message to the linked group.",
    Args: "[STRING]"
}
