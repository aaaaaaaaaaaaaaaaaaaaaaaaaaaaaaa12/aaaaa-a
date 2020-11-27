const discord = require("discord.js");
const { message } = require("discord.js");
const Discord = require('discord.js');


module.exports = {
  name: "areyouthere",
  category: "main",
  description: "Am I here?",
  usage: "areyouthere",
  run: (client, message, args) => {
         message.channel.send(new Discord.MessageEmbed()
          .setTitle('Yes, I am here alive and working!')
          .setDescription('Are you here?')
          .setColor('f8f8f8')
          .setTimestamp()
          .setFooter('Are you here?')
        );
    }
}
