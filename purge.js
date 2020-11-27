const { message } = require('discord.js');
module.exports = {
  name: "purge",
  category: "moderation",
  description: "Purge messages, oh boi",
  usage: "purge (amount, max 100)",
  run: (client, message, args) => {

if (message.member.hasPermission("MANAGE_MESSAGES")) {
const args = message.content.split(" ")
let deleteCount = parseInt(args[1]) || 2;
function err(msg) {
    message.channel.send({
        embed: {
            title: ":x: Error! :x:",
            description: "An unexpected error occurred: "+msg+""
        }
    })
}
if(!deleteCount || deleteCount > 100) {
    err("I can not delete more than **100** messages!");
} else {
    deleteCount++
    message.channel.messages.fetch({limit: deleteCount}).then(fetched => {
        message.channel.bulkDelete(fetched)
            .catch(error => err(error));
    });
}
} else {
    message.channel.send({
        embed: {
            title: ":x: Error! :x:",
            description: 'You can\'t use that!'            
        }
    })
}
  }
}
