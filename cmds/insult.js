const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (bot, message, args) => {
    let who = message.guild.member(message.mentions.users.first()) //|| message.content.slice(8,message.content.length);
    if (!who) return message.reply('You did not metion a user!');
    if (who === message.guild.member(message.mentions.users.first())) {who = '<@'+who.id+'>'};
    //var  who = message.content.slice(8,message.content.length);
    var way = request(`https://insult.mattbas.org/api/insult.json?who=${who}&template=%09text%2Fjson`, { json: true },(err, res, body) => {
        //if (JSON.stringify(body.status)==='error') { return message.reply('**You are not verified, please link your account.**');}
        if (err){ return console.log(err);}
           var obj = JSON.stringify(body.insult);
           var oc = obj.slice(1,obj.length-1);
           var sendthis = new Discord.RichEmbed()
           .setTitle('Insult')
           .setDescription(''+who+oc+'')
           .setColor(0x154360);
           message.channel.sendEmbed(sendthis);
    });
}

module.exports.help = {
    name: "insult",
    info: "Insults the mention",
    Args: "[METION]"
}
