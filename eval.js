exports.run = (client, message, args) => {
    if(message.author.id != "480887157909618688") return;
    if(!args[0]) {
        return message.channel.send("gimme de code noob");
    }
    try {
        const code = args.join(" ");
        let evaled = eval(code);
        if(typeof evaled != "string") {
            evaled = require("util").inspect(evaled);
        }
    } catch (err) {
        return message.channel.send({embed: {
            color: 7948427,
            description: `**An error occured, qu_uo**\n`
            + `\`There was a error D:  ${err}\``,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    return message.channel.send({embed: {
        color: 7948427,
        description: `**Success!:**\n`
            + `\`Just put your code, qu_uo!\``,
        
        }
    });
}
