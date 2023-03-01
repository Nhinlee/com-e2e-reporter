const { App } = require("@slack/bolt");


// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 9090);

    console.log('⚡️ Bolt app is running!');
})();
