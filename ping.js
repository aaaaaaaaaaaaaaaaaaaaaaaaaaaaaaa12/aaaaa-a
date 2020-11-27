       module.exports = {
  name: "ping",
  category: "main",
  description: "Get the bot ping!",
  usage: "ping",
  run: (client, message, args) => {
return message.channel.send('Ping?').then(msg => {
            msg.edit(`Pong! \n**Latency** is \`${msg.createdTimestamp - message.createdTimestamp}\`ms.\n**API Latency** is \`${Math.round(client.ws.ping)}ms\``);
        }).catch((e) => {
            client.logger.error(`Error : ${e}`);
            return false;
        });
    }
}
