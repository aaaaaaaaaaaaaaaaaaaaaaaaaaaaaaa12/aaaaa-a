const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["[-] QOTD Team"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "You can't use that! You need the `[-] QOTD Team` role to use the **QOTD** command!",
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
            description: `How do you want me to post a QOTD if you don't give me a QOTD.`,
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
            description: `An error occured, QOTD was not posted.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    message.channel.send({embed: {
        color: 9240450,
      title: ":white_check_mark: Success! :white_check_mark:",
        description: `Successfully posted the QOTD you gave me. :wink: \n${msg}`,
        
      
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = message.guild.channels.cache.get(process.env.qotdchannelid);
    logchannel.send({embed: {
        color: 2127726,
        title: "Question of the day!",
        description: `${msg}`,

        footer: {
            text: 'Question of the day!',
        },
        timestamp: new Date()
    }});
}
