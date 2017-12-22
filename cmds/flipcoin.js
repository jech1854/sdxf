var math = require('mathjs');
module.exports.run = async (bot, message, args) => {
    let a = math.randomInt(10)
    if (a >5){
      message.channel.send('Your coin flip resulted in **HEADS**');
    }
    else if(a <5){
      message.channel.send('Your coin flip resulted in **TAILS**');
    }



}

module.exports.help = {
    name: "flipcoin",
    info: "Flips coin",
    Args: "-"
}
