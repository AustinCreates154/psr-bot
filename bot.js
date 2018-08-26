const discord = require('discord.js');
const client = new discord.Client();
const config = require(`./config.json`)
var prefix = "."


// ===Loading commands===

client.commands = new discord.Collection()

require('fs').readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    client.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

// ===Done Loading commands===

client.on('guildMemberAdd', (member) => require('./events/guildMemberAdd.js')(client, member))

client.on('ready', () => {
  var statuses = ["over Himiachi Base", "bot moosic", "bot gamez"]
  var result = statuses[Math.floor(Math.random() * statuses.length)]
  client.user.setActivity(`Loading Himiachi...`, {type: "STREAMING", url: "https://twitch.tv/freakinghulk"})
  setTimeout(() => {
    setInterval(() => {
      if (result == statuses[0]) {
        client.user.setActivity(result, {type: "WATCHING"})
      }
   
      if (result == statuses[1]) {
        client.user.setActivity(result, {type: "LISTENING"})
      }
   
      if (result == statuses[2]) {
        client.user.setActivity(result, {type: "PLAYING"})
      }
    }, 25000)
  }, 10000)
    console.log(`${client.user.tag} ready!`)
})
 // ==Rotator==

client.on('message', message => {
  let mArray = message.content.split(" ")
  let args = mArray.slice(1)
  let cmd = client.commands.get(mArray[0].slice(prefix.length))
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.content.startsWith(prefix)) return;
  
  if (cmd) {
    if (config.ubl.includes(message.author.id)) return;
    cmd.run(client, message, args, discord)
    console.log(`${message.author.username} used the ${message.content.split(" ")[0]} command.`)
  }
})


client.login(process.env.token)
