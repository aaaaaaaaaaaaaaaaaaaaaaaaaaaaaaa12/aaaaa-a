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
             title: ":x: Error! :x:",
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
            description: ":x: Please add the username!",

            }
        });
    }
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send({embed: {
            color: 16733013,
                      title: ":x: Error! :x:",
            description: `${username} is not a valid Roblox user. Try again!`,
            }
        });
    }
    let rankInGroup = await getRankID(Number(process.env.groupId), id);
    let rankNameInGroup = await getRankName(Number(process.env.groupId), id);
    if(Number(process.env.maximumRank) <= rankInGroup || Number(process.env.maximumRank) <= rankInGroup + 1){
        return message.channel.send({embed: {
            color: 16733013,
            title: ":x: Error! :x:",
            description: "I can not promote that user.",
            }
        });
    }
    let promoteResponse;
    try {
        promoteResponse = await roblox.promote(Number(process.env.groupId), id);
    } catch (err) {
        console.log(chalk.red('An error occured when running the promote command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `An error occured, user was not promoted.`,
          
            }
        });
    }
    let newRankName = await getRankName(Number(process.env.groupId), id);
    let newRank = await getRankID(Number(process.env.groupId), id);
    message.channel.send({embed: {
        color: 9240450,
        title: `:white_check_mark: Success! :white_check_mark:`,
        description: `Promoted ${username} to ${promoteResponse.newRole.name} (${promoteResponse.newRole.rank})`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        title: `**User Promoted**`,
        description: `Command used: .promote \nWho used the command: <@${message.author.id}> \nUser: ${username} \nOld Rank: ${rankNameInGroup} (${rankInGroup}) \nNew Rank: ${promoteResponse.newRole.name} (${promoteResponse.newRole.rank}).`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Octopus Hotels'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
        }
    }});
}
