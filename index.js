const express = require("express");
const app = express();

app.get("/", (_, res) => res.send("melati ar bot running"));
app.listen(3000, () => console.log("Web server running"));

const fs = require("fs");

const {
  Client,
  GatewayIntentBits
} = require("discord.js");

// ================= CLIENT =================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ================= COMMAND LOADER =================
const commands = new Map();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.trigger, command);
}

// ================= READY =================
client.once("ready", () => {
  console.log(`READY: ${client.user.tag}`);

  client.user.setPresence({
    activities: [{
      name: "working in melati hub",
      type: 1,
      url: "https://twitch.tv/discord"
    }],
    status: "online"
  });
});

// ================= MESSAGE SYSTEM =================
client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  const content = message.content.trim().toLowerCase();

  const command = commands.get(content);

  if (!command) return;

  try {
    await command.execute(message);
  } catch (err) {
    console.error(err);
  }

});

client.login(process.env.TOKEN);
