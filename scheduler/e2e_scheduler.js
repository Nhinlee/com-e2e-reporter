
const channelID = 'C04R68VEBKR'

let SHEET_ID = '17NNQNDKGmLbtI_abxVk_fJXFR5Km2JW1Ov4ovzDqz88'
let SHEET_TITLE = 'E2E Communication check list';
let SHEET_RANGE = 'A1:C5'

let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

async function getDataFromSheetAndSendMessage(client) {
    // Get data from the google sheet
    let sheet = await fetch(FULL_URL)
    let text = await sheet.text()

    // Parse data
    let data = JSON.parse(text.substr(47).slice(0, -2));
    let length = data.table.rows.length;

    const now = new Date(Date.now())
    console.log(now.getFullYear());
    console.log(now.getMonth());
    console.log(now.getDate());

    for (let i = 0; i < length; i++) {
        let rowData = data.table.rows[i].c

        let date = rowData[0].f
        let email = rowData[1].v

        let checkTime = new Date(date)

        // Compare time to send message
        if (now.getMonth() == checkTime.getMonth()
            && now.getDate() == checkTime.getDate()) {

            console.log(email);
            await sendMessageToChannel(client, email)
        }
    }
}


async function sendMessageToChannel(client, email) {
    try {
        let tag = email.split("@")[0]
        // Call the chat.postMessage method using the WebClient
        const result = await client.chat.postMessage({
            channel: channelID,
            text: `Hello <@${tag}>, this is the test schedule message, this is the link to check schdule report https://docs.google.com/spreadsheets/d/17NNQNDKGmLbtI_abxVk_fJXFR5Km2JW1Ov4ovzDqz88/edit#gid=0`,
            token: process.env.SLACK_BOT_TOKEN,
        });

        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { sendMessageToChannel, getDataFromSheetAndSendMessage };
