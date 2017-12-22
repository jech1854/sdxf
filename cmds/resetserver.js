const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');
const fs =  require('fs');

module.exports.run = async (bot, message, args) => {
  let Commander = message.guild.roles.find("name", "Bot Operator")
  if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
  let user = 'None';
  let pass = 'None';
  let g = request(`https://discorddatabasejech.000webhostapp.com/Guilds/saveguild.php?id=${message.guild.id}&group=${0}&username=${user}&password=${pass}`, { json: true },(err, res, body) => {
          message.reply('Server Settings Reset.')
  });
}


module.exports.help = {
    name: "resetserver",
    info: "Resets your server settings",
    Args: "-"
}
