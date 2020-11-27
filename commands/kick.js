const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <raeson>",
  run: (client, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`${message.author}, you can't use that.`)
    }
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`I don't have **KICK_MEMBERS** permissions!`)
    }
    
    let target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send(`Please @mention the user who you want to kick!`)
    }
    
    if(target.id === message.author.id) {
     return message.channel.send(`Why would you kick yourself? :joy:`)
    }
    
  if(!args[1]) {
    return message.channel.send(`Reason for kick is not provided!`)
  }
    
    let embed = new discord.MessageEmbed()
    .setTitle(":white_check_mark: Success! :white_check_mark:")
    .setDescription(`Successfully kicked ${target} / ${target.id}! For`)
    .AddField(args.join(" "),`Reason for kick`)
    .setColor("RANDOM")
    .setFooter(`Octopus Hotels!`);
    
    message.channel.send(embed)
    
    target.kick(args[1]);
    
    
    
  }
}