const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    let shout;
    try {
        shout = await roblox.getShout(Number(process.env.groupId));
    } catch (err) {
        console.log(chalk.red('An error occured when running the currentshout command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `:x: An error occured! :x:`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
  if(shout.body){
    message.channel.send({embed: {
        title: "**Group | Group Shout**",
        color: 7948427,
        description: `\n${shout.body}\nShouted by **${shout.poster.username}**`,
        
        
    }});
  } else {
        message.channel.send({embed: {
        title: "**Group | Group Shout**",
        color: 7948427,
        description: `\n${shout.body}\nShouted by **${shout.poster.username}**`,
          timestamp: new Date()
        },
   
    });
  }
}
