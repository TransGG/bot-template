import { loadCommands, loadInteractions } from "@hyperneutrino/djs-lite";
import { Client, Events, IntentsBitField } from "discord.js";

if (!Bun.env.TOKEN) throw new Error(".env is missing TOKEN");
if (!Bun.env.MONGODB_URI) throw new Error(".env is missing MONGODB_URI");

const client = new Client({
    intents: IntentsBitField.Flags.Guilds,
    allowedMentions: { parse: [] }, // Do not change this; set this per-message to avoid unintentional pings.
    partials: [],
    sweepers: {}, // You must set up sweepers for anything that might memory leak (e.g. messages).
});

const promise = new Promise<Client<true>>((res) => client.once(Events.ClientReady, res));
await client.login(Bun.env.TOKEN);
const bot = await promise;

await loadCommands(bot, "src/commands");
await loadInteractions(bot, "src/interactions");

console.log("[Process Startup Complete]");
