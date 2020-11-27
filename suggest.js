const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your Suggestion",
  category: "main",
  run: (client, message, args) => {
    
    if(!args.length) {
      return message.channel.send("Please give me the suggestion!")
    }
    
    let channel = message.guild.channels.cache.find((x) => (x.name === "suggestion" || x.name === "suggestions"))
    
    
    if(!channel) {
      return message.channel.send("There is no channel called suggestions!")
    }
                                                    
    
    let embed = new MessageEmbed()
    .setAuthor("Suggestion")
    .setThumbnail(message.author.avatarURL())
    .setColor("f8f8f8")
    .setDescription(args.join(" "))
    .setTimestamp()
    
    
    channel.send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    })
    

    
    message.channel.send("Success! Just sent your suggestion to the suggestions channel, ID: " + channel)
    
  }
}
