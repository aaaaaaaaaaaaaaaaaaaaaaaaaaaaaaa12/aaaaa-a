const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Ranker", "Shouter","Testing Role"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
           title: ":x: Error! :x:",
            description: "You can't use that! Needed role(s):\n`Ranker/Shouter`",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let msg = args.join(' ');
    if(!msg){
        return message.channel.send({embed: {
            color: 16733013,
          title: ":x: Error! :x:",
            description: `Give me the shout message!`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let shoutResponse;
    try {
        shoutResponse = await roblox.shout(Number(process.env.groupId), msg);
    } catch (err) {
        console.log(chalk.red('An error occured when running the shout command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
title: ":x: Error! :x:",
          description: `An error has occured, shout was not posted.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    message.channel.send({embed: {
        color: 9240450,
      title: `**Shout Made** :white_check_mark:`,
        description: `\n`
        + `${msg}`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> has posted a Octopus Hotels group shout, here is the shout message: \n`
        + `${msg}`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Octopus Hotels'
        },
        timestamp: new Date()
    }});
}
