const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Ranking Access", "Shout Access","Testing Role"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "You can't use that! Needed role(s):\n`Ranker/Shouter`",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let clearShoutResponse;
    try {
        clearShoutResponse = await roblox.shout(Number(process.env.groupId), '');
    } catch (err) {
        console.log(chalk.red('An error occured when running the clearshout command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `Error occured, shout was not cleared.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    message.channel.send({embed: {
        color: 9240450,
        title: ":white_check_mark: Success! :white_check_mark:",
        description: `Cleared group shout.`,
        
        }
    });
    if(process.env.logchannelid === 'false') return;
    let logchannel = message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> has cleared the group shout.`,
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
