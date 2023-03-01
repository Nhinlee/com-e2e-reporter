const { App } = require("@slack/bolt");
const { registerListeners } = require("./listeners");


const { FileInstallationStore } = require('@slack/oauth');

// Initializes your app with your bot token and signing secret
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'my-state-secret',
    scopes: [
        "channels:read",
        "chat:write",
        "chat:write.public",
        "commands"
    ],
    port: process.env.PORT || 9090,
    installationStore: new FileInstallationStore(),
});

/** Register Listeners */
registerListeners(app);

(async () => {
    // Start your app
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();

// app.message('hello', async ({ message, say }) => {
//     // say() sends a message to the channel where the event was triggered
//     await say({
//         text: `Hey there <@${message.user}>!`,
//         blocks: [
//             {
//                 "type": "section",
//                 "text": {
//                     "type": "mrkdwn",
//                     "text": `Hey there <@${message.user}>!`
//                 },
//                 "accessory": {
//                     "type": "button",
//                     "text": {
//                         "type": "plain_text",
//                         "text": "Click Me"
//                     },
//                     "action_id": "button_click"
//                 }
//             }
//         ],
//     })
// })
