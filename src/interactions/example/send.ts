import { ComponentType, MessageFlags, type ButtonInteraction } from "discord.js";

export default async function (button: ButtonInteraction, message: string) {
    await button.reply({
        flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
        components: [{ type: ComponentType.TextDisplay, content: message }],
    });
}
