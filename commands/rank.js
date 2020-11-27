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
            description: "Please give me a username!",
            
            }
        });
    }
    let rank = Number(args[1]);
    let newrank;
    if(!rank){
        let midrank = args.slice(1).join(' ');
        if(!midrank){
            return message.channel.send({embed: {
                color: 16733013,
                title: ":x: Error! :x:",
                description: "I can not rank that user if you don't give me a rank to rank them to.",
                
                }
            });
        }
        newrank = await getRankFromName(midrank, Number(process.env.groupId));
    } else {
        newrank = rank;
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
    if(Number(process.env.maximumRank) <= rankInGroup || Number(process.env.maximumRank) <= newrank){
        return message.channel.send({embed: {
            color: 16733013,
            title: ":x: Error! :x:",
            description: "My role is not high enough to rank that user!",
           
            }
        });
    }
if(newrank == 'NOT_FOUND'){
        return message.channel.send({embed: {
            color: 16733013,
            title: ':x: Error! :x:',
            description: "The rank that you gave me could not be found.",
            
            }
        });
    }
    let setRankResponse;
    try {
        setRankResponse = await roblox.setRank(Number(process.env.groupId), id, newrank);
    } catch (err) {
        console.log(chalk.red('An error occured when running the setrank command: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `An error occured, user was not ranked.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let newRankName = await getRankName(Number(process.env.groupId), id);
    message.channel.send({embed: {
        color: 9240450,
        title: ":white_check_mark: Success! :white_check_mark:",
        description: `Ranked ${username} to ${setRankResponse.name} (${setRankResponse.rank})`,

        }
    });
    if(process.env.logchannelid === 'false') return;
    let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        title: `**User Ranked**`,
        description: `Who used the command: <@${message.author.id}> \nUsername: ${username} \nOld Rank: ${rankNameInGroup} (${rankInGroup}) \nNew Rank: ${setRankResponse.name} (${setRankResponse.rank}).`,
        },
        footer: {
            text: 'Octopus Hotels'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
        }
    });
}
