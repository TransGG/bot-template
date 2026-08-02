import { SlashCommand } from "@hyperneutrino/djs-lite";
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ButtonStyle,
    ComponentType,
    MessageFlags,
} from "discord.js";
import { getScore, incrementScore } from "../lib/db/example.ts";

export default new SlashCommand({
    type: ApplicationCommandType.ChatInput,
    name: "example",
    description: "example command (remove before releasing to production)",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "message",
            description: "send a button that sends a message (input)",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "message",
                    description: "the message for the example button to send",
                    required: true,
                    maxLength: 80,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.SubcommandGroup,
            name: "score",
            description: "example score commands",
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "get",
                    description: "get your current score",
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "increment",
                    description: "increase your score by one",
                },
            ],
        },
    ],
    handler: async (cmd) => {
        const group = cmd.options.getSubcommandGroup(false);
        const sub = cmd.options.getSubcommand(true);

        if (group === "score" && sub === "get") {
            const score = await getScore(cmd.user.id);

            await cmd.reply({
                flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                components: [{ type: ComponentType.TextDisplay, content: `Your score is ${score}.` }],
            });
        } else if (group === "score" && sub === "increment") {
            const score = await incrementScore(cmd.user.id);

            await cmd.reply({
                flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: `Your score has been incremented. It is now ${score}.`,
                    },
                ],
            });
        } else if (sub === "message") {
            const message = cmd.options.getString("message", true);

            await cmd.reply({
                flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Secondary,
                                customId: `::example/send:${message}`,
                                label: "send example message",
                            },
                        ],
                    },
                ],
            });
        }
    },
});
