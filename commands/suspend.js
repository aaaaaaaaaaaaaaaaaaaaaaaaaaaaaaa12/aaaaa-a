const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

async function getRankName(func_group, func_user){
    let rolename = await roblox.getRankNameInGroup(func_group, func_user);
    return rolename;
}

async function getRankID(func_group, func_user){
    let role = await roblox.getRankInGroup(func_group, func_user);
    return role;
}

async function getRankFromName(func_rankname, func_group){
    let roles = await roblox.getRoles(func_group);
    let role = await roles.find(rank => rank.name == func_rankname);
    if(!role){
        return 'NOT_FOUND';
    }
    return role.rank;
}

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["Ranking Access","Testing Role"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "You can't use that! Needed role(s):\n`Ranker`",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }})
    }
    let username = args[0];
    if(!username){
        return message.channel.send({embed: {
            color: 16733013,
            title: ":x: Error! :x:",
            description: "I can not suspend a user if you don't give me a username!",
        }});
    }
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send({embed: {
            color: 16733013,
            title: ":x: Error :x:",
            description: `${username} is not a Roblox user. Try again!`,

        }});
    }
    let rankInGroup = await getRankID(Number(process.env.groupId), id);
    let rankNameInGroup = await getRankName(Number(process.env.groupId), id);
    if(Number(process.env.maximumRank) <= rankInGroup){
        return message.channel.send({embed: {
            color: 16733013,
            description: "I can not suspend this user.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let fireResponse;
    try {
        fireResponse = await roblox.setRank(Number(process.env.groupId), id, 4);
    } catch (err) {
        console.log(chalk.red('An error occured when running the fire command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `An error occured, user was not suspended.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let newRankName = await getRankName(Number(process.env.groupId), id);
    let newRank = await getRankID(Number(process.env.groupId), id);
    message.channel.send({embed: {
        color: 9240450,
        title: ":white_check_mark: Success! :white_check_mark:",
        description: `Suspended ${username}!`,
        
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        title: `**User Suspended**`,
        description: `Who used the command: <@${message.author.id}> \nUsername: ${username} \nOld Rank: ${rankNameInGroup} (${rankInGroup}) \nNew Rank: ${fireResponse.name} (${fireResponse.rank}).`,
        },
        footer: {
            text: 'Octopus Hotels'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username=${username}`
        }
    });
}
