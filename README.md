# bot-template

This is the template for TGG Discord bots. A couple of examples have been included to demonstrate how commands and interactions are loaded.

## Instructions

For the database, `db` should **not** be exported; instead, each file in `db` (except `driver.ts`) should use `getMongoCollection<T>` (where `T` is the type of each document in the collection) and export specific functions to interact with the collection and **not** export the collection itself.

Do **not** remove the `[Process Startup Complete]` log message, as that is used by Pterodactyl to mark the server as running.

Please use zod (`bun install zod` and `import z from zod`) for validating objects if their structure is not already enforced upstream. For example, you can assume that `cmd.options.getString(...)` will give you a string, but if you are fetching data from an API, please validate it with `zod` and don't use `as { ... }`.

If you get an error related to `if (startupSnapshot?.isBuildingSnapshot?.())`, just go into the file (`node_modules/bson/lib/bson.cjs`) and delete that `if` statement and the `const` declaration above it. This is an issue with bun itself but removing this code does not break anything. This is a temporary fix.

## Design language

If the bot's identity is humanoid, it is allowed to use first-person pronouns, but otherwise, the bot should refer to itself in third person.

Button labels and other text should use title case (first letter of the sentence capitalized and all subsequent words lowercased) except if specific circumstances would make capitalizing each word (or even each letter) make more sense.

Container accent colors should be meaningful (up to your interpretation what that means, but examples include `Colors.Green` for success messages), or if there's nothing particularly meaningful to use, each bot should have a specific branding color that it sticks to for everything else.

## Code style guidelines

Every message must use components V2. Even if it's text-only, use the `TextDisplay` component (it does display differently than normal content).

Use `camelCase` for everything. Sometimes, `discord.js` will allow `snake_case` (for example, `custom_id` and `customId` will both be accepted), but always use `camelCase` so that everything is consistent.

Variable and function names should be in `camelCase`. Class names should be in `PascalCase`. Global constant values should be in `SCREAMING_SNAKE_CASE`.

Use `const`s wherever possible. Use `let` if you must. Never use `var`.

Prefer `await f().then((data) => g(data))` over `await g(await f())` and `await f().then((data) => data.example)` over `(await f()).example`. Basically, avoid putting brackets around an `await` if possible.

Objects can be inline (`{ ... }` as opposed to having newlines) but only if they do not contain any objects within. For example, the following is okay:

```ts
const x = {
    a: 1,
    b: { c: 2, d: 3 },
};
```

Use prettier to format your code. This will automatically apply the provided `.prettierrc`. Organize your imports with VSCode's built-in organize operation.

Prefer `array.map((x) => ...).filter((x) => x !== null or x !== undefined)` over `array.flatMap((x) => ... or [])`.
