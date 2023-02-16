require("dotenv").config(); // Load .env file
const axios = require("axios");
const Discord = require("discord.js");
const { Intents, GatewayIntentBits } = require("discord.js");
const client = new Discord.Client({ intents: [32767] });
//const myServer = "960847049862049822";
const deSurf = "961244696938696704";
const muonServer = '830888887253073920';
const botSecret = process.env.TOKEN;
console.log(process.env.TOKEN)
const getNodes = () => {
  axios
    .get("http://103.75.196.96/nodes")
    .then((response) => {
      const data = response.data;
      const activeNodes = data.result.filter((node) => node.active);
      console.log(activeNodes.length);
      client.guilds.cache
        .find((guild) => guild.id === `${muonServer}`)
        .me.setNickname(`${activeNodes.length} Active Nodes`);
      client.user.setActivity(`ALICE Testnet`, { type: "WATCHING" });
    })
    .catch((error) => {
      console.error(error);
    });
};

// Runs when client connects to Discord.
client.on("ready", () => {
  console.log("Logged in as", client.user.tag);
  setInterval(getNodes, 60000); // Ping server once on startup
});

// Login to Discord
client.login(process.env.TOKEN);
