const discord = require("discord.js");
const { message } = require("discord.js");
const Discord = require('discord.js');


module.exports = {
  name: "help",
  category: "main",
  description: "Am I here?",
  usage: "areyouthere",
  run: (client, message, args) => {
         message.channel.send(new Discord.MessageEmbed()               
          .setColor('f8f8f8')
          .setTitle('Commands List | Prefix: **!!**')
.setDescription('Just some stuff you may wanna know:\nCaps don\'t matter KiCk = kick hElP = help | To rank a user use their full username or it won\'t work | () are optional arguments and <> are required arguments \n**Ranking** \n`Demote <user>` - Ranks a user 1 rank down\n`Promote <user>` - Promotes a user 1 rank up\n `Rank <user> <rank name/ rank ID>` - Ranks a user to a specific rank. Ex: Rank qu_uo hotel guest\n`Suspend <user>` - Gives a user suspended role\n`Trainee <user>` - Gives a user trainee role\n**General Information**\n`help` - Shows this message\n`currentshout` - Shows the current group shout\n`ping` - Shows the bot ping\n `areyouthere` - Am I here?\n**Discord Management** \n `kick <@mention> (reason)` - Kicks a user\n `qotd <qotd message>` - Posts a QOTD in the group and QOTD channel\n `suggest <suggestion>` - Sends a suggestion to the suggestion channel\n `purge <amount of messages, max 99>` -  Bulk deletes certain amount of messages\n**Group Management** \n `shout <shout message>` - Posts a groupshout\n `clearshout` - Clears the group shout')
        );
    }
}
