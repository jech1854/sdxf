const Discord = require("discord.js");
const rbx = require('roblox-js');
const request = require('request');
const fs =  require('fs');
const rp = require('request-promise');
const S = require('string');
const waitUntil = require('wait-until');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.commandlist = '';
var PREFIX = '!';
var TOKEN = process.env.TOKEN;






fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log('No commands to load!');
        return;
    }
    console.log(`Loading ${jsfiles.length} commands`);

    jsfiles.forEach((f, i) => {
        let props =  require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commandlist = bot.commandlist + '**'+props.help.name+': **' +'`'+props.help.Args+'`'+props.help.info+'\n';
    })
})



bot.on("ready", () =>{

console.log("bot logged in");
bot.user.setGame(`${PREFIX}help | ${bot.guilds.size} guilds`,`http://www.twitch.tv/akashimontage`);
});

bot.on('guildCreate', guild => {
  
  waitUntil()
    .interval(250)
    .times(100)
    .condition(function(cb) {
        process.nextTick(function() {
            cb(guild.avaliable ? true : false);
        });
    })
    .done(function(result) {
        // do stuff 
    let g = request(`https://discorddatabasejech.000webhostapp.com/Guilds/saveguild.php?id=${guild.id}&group=${0}&username=${'None'}&password=${'None'}`, { json: true },(err, res, body) => {
                bot.user.setGame(`${PREFIX}help | ${bot.guilds.size} guilds`,`http://www.twitch.tv/akashimontage`);
                guild.createRole({
                  name: 'Bot Operator',
                  color: 'BLUE',
      })
        .then(role => console.log(`Created role ${role}`))
        .catch(console.error)
        guild.createRole({
          name: 'Verified',
          color: 'BLUE',
      })
      .then(role => console.log(`Created role ${role}`))
      .catch(console.error)
      guild.createRole({
        name: 'Pending',
        color: 'BLUE',
      })
      .then(role => console.log(`Created role ${role}`))
      .catch(console.error)
      
        
        });

        guild.channels.first().send(":thumbsup: RoLink has be successfully added to this server\n To view the command list say `!help`, for admin only commands you must have the `Bot Operator` role for them to work. Configure your server as you would like. Need any help join this server discord.gg/Sj2NE5z , Have a nice day.")
    });
        
        

    })
    



bot.on('guildDelete', guild => {
  let g = request(`https://discorddatabasejech.000webhostapp.com/Guilds/delguild.php?id=${guild.id}`, { json: true },(err, res, body) => {
          bot.user.setGame(`${PREFIX}help | ${bot.guilds.size} guilds`,`http://www.twitch.tv/akashimontage`);
  });
});


bot.on("message", async message => {


    if (message.author.equals(bot.user)) return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!message.content.startsWith(PREFIX)) return;

    let cmd = bot.commands.get(command.slice(PREFIX.length))
    if (cmd) cmd.run(bot,message,args);


});




bot.login(TOKEN);

setInterval(() => {
request(`https://enthusiastic-vision.glitch.me`, { json: false },(err, res, body) => {
           // if (JSON.stringify(body.status)==='error') { return message.reply('**You have not been verified, link your account again.');}
             if (err){ return console.log(err);}
                return console.log('Pinged');
});

}, 180000);
