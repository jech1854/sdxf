const rbx = module.require('roblox-js');
const Discord = module.require("discord.js");
const request = require('request');

module.exports.run = async (bot, message, args) => {
    let Commander = message.guild.roles.find("name", "Bot Operator")
    if (!message.member.roles.has(Commander.id)) return message.reply('You are Not an Admin');
    let g = request(`https://discorddatabasejech.000webhostapp.com/Guilds/${message.guild.id}.json`, { json: true },(err, res, body) => {
            if (err){ return console.log(err);}
            let obj = JSON.parse(JSON.stringify(body));
            let group = obj.group;//JSON.stringify(body.group).slice(1,body.group.length+1);
            if (group === 0) return message.reply('You have not linked a group');
            let username = obj.username;//JSON.stringify(body.username).slice(1,body.username.length+1)
            let password = obj.password;//JSON.stringify(body.password).slice(1,body.password.length+1)
            console.log(username+'-'+password);
            rbx.login(username,password).then(function () {

   /* let toRank = message.guild.member(message.mentions.users.first())
    if (toRank){
        var otp = {
            group: 3054848,
            target: tarid,
            name: rank
        }
        var wat = request(`https://verify.eryn.io/api/user/${toRank.id}`, { json: true },(err, res, body) => {
            if (JSON.stringify(body.status)==='error') { return message.reply('**This user is not linked to the database**.');}
            if (err){ return console.log(err);}
            otp.target = JSON.stringify(body.robloxId);
            var a = message.content.slice(6,message.content.length);
            var b = a.indexOf(' ');
            otp.name = b.slice(b,a.length);

            rbx.setRank(otp).then(function (newRole) {
                //console.log('The new role is: ' + JSON.stringify(newRole));
                message.reply('**' + JSON.stringify(body.robloxUsername) + ' now has the rank of ' + otp.name + '**');
            });

        });
    }*/
    var target = 'somerandomdude';// passed as player usename(string)
    var a = message.content.slice(target,message.content.length);
    var b = a.indexOf(' ') +  1;
    var c = a.slice(b, message.content.length);
    var rank = c;
    console.log(rank);
    console.log(target);
    var d = rank.indexOf(' ');
    var cd = rank.slice(0,d);
    var eb = rank.slice(d+1,rank.length);
    target = cd;
    rank = eb;
    console.log('-------------');
    console.log(rank);
    console.log(target);

    let wes = request(`http://api.roblox.com/users/get-by-username?username=${target}`, { json: true },(err, res, body) => {
      var json = JSON.parse(JSON.stringify(body));
      var tarid = json.Id;


var options = {
        group: parseInt(group),
        target: tarid,
        name: rank

}
rbx.setRank(options).then(function (newRole) {
    //console.log('The new role is: ' + JSON.stringify(newRole));
    message.reply('**' + target + ' now has the rank of ' + options.name + '**');
});
});
});
});
}
module.exports.help = {
    name: "rank",
    info: "Ranks a player in the roblox group linked to the server",
    Args: "[ROBOX USERNAME] [RANK]"
}
