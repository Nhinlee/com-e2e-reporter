
const channelID = 'C04R68VEBKR'

async function sendMessageToChannel(client) {
    try {
        // Call the chat.postMessage method using the WebClient
        const result = await client.chat.postMessage({
            channel: channelID,
            text: `Hello <@chinhin.le>, this is the test message`,
            token: process.env.SLACK_BOT_TOKEN,
        });

        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { sendMessageToChannel };
