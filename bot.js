const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on("guildMemberAdd" member => {
  console.log(member.user.username + "Has joined PSR")
})
bot.on("ready", () => {
  console.log('PSR bot is locked and loaded')
})
bot.login(process.evl.TOKEN)
