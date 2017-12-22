const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');
const fs =  require('fs');

module.exports.run = async (bot, message, args) => {
          if (message.channel.type === 'text') {
            let Commander = message.guild.roles.find("name", "Bot Operator")
            if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
            let guildid = message.guild.id;
            let g = request(`https://discorddatabasejech.000webhostapp.com/Guilds/${guildid}.json`, { json: true },(err, res, body) => {
            if (err){ return console.log(err);}
            let obj = JSON.parse(JSON.stringify(body));
            console.log(obj);
            let guild = obj.guild;
            let group = obj.group;//JSON.stringify(body.group).slice(1,body.group.length+1);
            if (group === 0) return message.reply('You have not linked a group');
            let username = obj.username;//JSON.stringify(body.username).slice(1,body.username.length+1)
            message.channel.send("**Sliding Into Your DM's**");
            var NewEm = new Discord.RichEmbed()
            .setTitle('Configuring your Server username')
            .setDescription("Make sure your username is 100% correct as username's are case sensitive.\nIf you ever wanted to update your username, make sure you go back to the server and run the `!setusername` command with no arguments.\nTo Configure your username call the command as `!setusername [CODE] [USERNAME]`\n Your Config Code is: ``"+message.guild.id+"``")
            .setColor(0x154360);
            message.author.sendEmbed(NewEm);
            
          })
            }
          else if (message.channel.type === 'dm'){
            let code = message.content.slice(13,message.content.indexOf(' ',15));
            let username = message.content.slice(message.content.indexOf(' ',15)+1,message.content.length)
            let wat = request(`https://discorddatabasejech.000webhostapp.com/Guilds/${code}.json`, { json: true },(err, res, body) => {
              let obj = JSON.parse(JSON.stringify(body));
              let password = obj.password;
              let group = obj.group;
              let g = request(`https://discorddatabasejech.000webhostapp.com/Guilds/saveguild.php?id=${code}&group=${group}&username=${username}&password=${password}`, { json: true },(err, res, body) => {
                  var Embed = new Discord.RichEmbed()
                    .setTitle('Sucess')
                    .setDescription('Your settings have been updated.')
                    .setColor(0x154360);
                    message.author.sendEmbed(Embed);
                })
              });
          }
    

}

module.exports.help = {
    name: "setusername",
    info: "Updates your group admin account username.",
    Args: "-"
}


