module.exports.run = (bot, message, args, discord) => {
  let em = new Discord.RichEmbed()
  .setTitle("Bot Version")
  .setDescrption("Hello there!")
  .addField("The bot's version is 0.01")
  .setFooter(`Requested by ${message.author.username}`)
  .setTimestamp()
  .setColor("BLUE")
  
  message.channel.send({embed: em})
}
    
module.exports.help = {
  name: "studio",
  usage: ".studio"
}
