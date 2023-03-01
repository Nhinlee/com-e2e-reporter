const { App } = require("@slack/bolt");
const { registerListeners } = require("./listeners");
const { sendMessageToChannel } = require("./scheduler/e2e_scheduler");


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


(async () => {
    sendMessageToChannel(app.client);
})();
