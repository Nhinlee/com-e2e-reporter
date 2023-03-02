
// camp-communication channel ID
const channelID = 'C01RN7GTSRY'

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

    for (let i = 0; i < length; i++) {
        let rowData = data.table.rows[i].c

        let date = rowData[0].f
        let email = rowData[1].v

        let checkTime = new Date(date)

        // Compare time to send message
        if (now.getMonth() == checkTime.getMonth()
            && now.getDate() == checkTime.getDate()) {

            console.log(email);
            return await sendMessageToChannel(client, email)
        }
    }
}


async function sendMessageToChannel(client, email) {
    try {
        let tag = email.split("@")[0]
        // Call the chat.postMessage method using the WebClient
        const result = await client.chat.postMessage({
            channel: channelID,
            token: process.env.SLACK_BOT_TOKEN,
            blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "E2E communication daily",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `Hi <@${tag}>, to make our E2E test stable :success: , pls help to check our E2E report :palms_up_together:`,
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Click here to get the report link"
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "E2E report",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "url": "https://mana-e2e.web.app/?squads=%40communication",
                        "action_id": "button-action"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Here is the schedule spreadsheet"
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "spreadsheet",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "url": "https://docs.google.com/spreadsheets/d/17NNQNDKGmLbtI_abxVk_fJXFR5Km2JW1Ov4ovzDqz88/edit?usp=sharing",
                        "action_id": "button-action"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "Pls help to report in this thread!",
                        "emoji": true
                    }
                }
            ],
        });

        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { sendMessageToChannel, getDataFromSheetAndSendMessage };
