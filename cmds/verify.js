const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');
const S = require('string');

module.exports.run = async (bot, message, args) => {
var wat = request(`https://discorddatabasejech.000webhostapp.com/Users/${message.author.id}.json`, { json: true },(err, res, body) => {
      //  if (JSON.stringify(body.status)==='error') { return message.reply('**You have not been verified, link your account again.');}
         if (err){ return console.log(err);}
            let obj = JSON.parse(JSON.stringify(body));
            var code = obj.verifycode;
            var username = obj.Username;
            rbx.getIdFromUsername(username).then(function(tarid){
              rbx.getStatus(tarid).then(function(userblurb){
            if (!code) return message.reply('Do the linkaccount `[USERNAME]` command first.');
            console.log(userblurb);
            var str = userblurb;
            //var resul = str.match(/code/g);
            if (!S(userblurb).contains(code)) return message.reply('Your Blurb Does not match your Verification code. \n Please redo the whole process.');
          //  if (!resul === code) return message.reply('Your Blurb Does not match your Verification code. \n Please redo the whole process.');
            var newreq = request(`https://discorddatabasejech.000webhostapp.com/Users/saveuser.php?id=${message.author.id}&vc=Verified&usnm=${username}&usid=${tarid}`, { json: true },(err, res, body) => {
            let Verif = message.guild.roles.find("name", "Verified")
            let Rem = message.guild.roles.find("name", "Pending")
            message.member.addRole(Verif.id);
            message.member.removeRole(Rem.id);
            var sendthis = new Discord.RichEmbed()
            .setTitle('Sucess')
            .setDescription('**You have been verified as: **' + username + '\n You can now remove the code from your profile.')
            .setColor(0x154360);
            message.channel.sendEmbed(sendthis);
          });
        })
      })
     });
}

module.exports.help = {
    name: "verify",
    info: "Checks if you have linked yuor account in the database.",
    Args: "-"
}
