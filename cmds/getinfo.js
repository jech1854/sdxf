const rbx = require('roblox-js');
const Discord = require("discord.js");
const request = require('request');
var rp = module.require('request-promise');


module.exports.run = async (bot, message, args) => {
    var w = request(`https://discorddatabasejech.000webhostapp.com/Guilds/${message.guild.id}.json`, { json: true },(err, res, body) => {
  var obj = JSON.parse(JSON.stringify(body));
  var group = obj.group;
  //if (group === 0) return message.reply('You have not linked a group');
    let toGet = message.guild.member(message.mentions.users.first()) || message.content.slice(9,message.content.length);
    if (!toGet) return message.reply('You did not specify a user mention or a username!');
    if (toGet == message.guild.member(message.mentions.users.first())) {
    let Got = request(`https://discorddatabasejech.000webhostapp.com/Users/${toGet.id}.json`, { json: true },(err, res, body) => {
        //if (JSON.stringify(body.status)==='error') { return message.reply('**This user is not verified!**');}
        if (err){ return console.log(err); }
          let obj = JSON.parse(JSON.stringify(body));
            var userid = obj.userid;
            var usnm = obj.Username;
           let bigstring = null;
           let main = {};
           let options = {
            method: 'GET',
            uri: `https://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=${userid}&groupId=${group}`,
            json: true,
            simple: false
           }

           if (group > 0){

             rp(options)
             .then(function (rankname) {
               var groupname = request(`https://api.roblox.com/groups/${group}`, { json: true },(err, res, body) => {
                   if (err){ return console.log(err); message.reply(err.stack + 'DM Jech#4318 If you get this error.')}
                   let ngf = JSON.stringify(body.Name.slice(1,body.Name.length-1))
                   if (rankname === 'Bad Request') return message.reply('**This user is not verified!**');
                   var drf = request(`http://api.roblox.com/users/get-by-username?username=${usnm}`, { json: true },(err, res, body) => {
                     let obj = JSON.parse(JSON.stringify(body));
                     let online = '**Is Online**: '+obj.IsOnline;
                   bigstring = '**'+ngf + '**: ' +  rankname;
                   var Embed = new Discord.RichEmbed()
                   .setTitle('Player Information for: '+ usnm)
                   .setDescription('**User Idenification Code**: '+userid+'\n'+online)
                   .addField('**Group Ranks**', bigstring)
                   .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=${usnm}`)
                   .setColor(0x154360);
                   message.channel.sendEmbed(Embed);
                 });
                });
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
           else if (group === 0){
             var drf = request(`http://api.roblox.com/users/get-by-username?username=${usnm}`, { json: true },(err, res, body) => {
               let obj = JSON.parse(JSON.stringify(body));
               let online = '**Is Online**: '+obj.IsOnline;
             var Embed = new Discord.RichEmbed()
             .setTitle('Player Information for: '+ usnm)
             .setDescription('**User Idenification Code**: '+userid+'\n'+online)
             .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=${usnm}`)
             .setColor(0x154360);
             message.channel.sendEmbed(Embed);
           });
           }

    });
      }
    else if (toGet === message.content.slice(9,message.content.length)){
         let nm = message.content.slice(9,message.content.length);
         let usid;
         let bigstring = null;
         let main = {};
         rbx.getIdFromUsername(nm).then(function(usid){
           
         
          
        let options = {
           method: 'GET',
           uri: `https://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=${usid}&groupId=${group}`,
           json: true,
           simple: false
        }



        if (group > 0){

          rp(options)
          .then(function (rankname) {
            var groupname = request(`https://api.roblox.com/groups/${group}`, { json: true },(err, res, body) => {
                if (err){ return console.log(err); message.reply(err.stack + 'DM Jech#4318 If you get this error.')}
                let ngf = JSON.stringify(body.Name.slice(1,body.Name.length-1))
                if (rankname === 'Bad Request') return message.reply('**This user is not verified!**');
                var drf = request(`http://api.roblox.com/users/get-by-username?username=${nm}`, { json: true },(err, res, body) => {
                  let obj = JSON.parse(JSON.stringify(body));
                  let online = '**Is Online**: '+obj.IsOnline;
                bigstring = '**'+ngf + '**: ' +  rankname;
                var Embed = new Discord.RichEmbed()
                .setTitle('Player Information for: '+ nm)
                .setDescription('**User Idenification Code**: '+usid+'\n'+online)
                .addField('**Group Ranks**', bigstring)
                .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=${nm}`)
                .setColor(0x154360);
                message.channel.sendEmbed(Embed);
              });
             });
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
        else if (group === 0){
          var drf = request(`http://api.roblox.com/users/get-by-username?username=${nm}`, { json: true },(err, res, body) => {
            let obj = JSON.parse(JSON.stringify(body));
            let online = '**Is Online**: '+obj.IsOnline;
          var Embed = new Discord.RichEmbed()
          .setTitle('Player Information for: '+ nm)
          .setDescription('**User Idenification Code**: '+usid+'\n'+online)
          .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=${nm}`)
          .setColor(0x154360);
          message.channel.sendEmbed(Embed);
        });
        }


        
        
    })

    }
    });
}

module.exports.help = {
    name: "getinfo",
    info: "Gets information of the requested metion or roblox player.",
    Args: "[METION] or [ROBLOX USERNAME]"
}
