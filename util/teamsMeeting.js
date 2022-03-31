require('isomorphic-fetch');
require('dotenv').config();
const { Client } = require('@microsoft/microsoft-graph-client');
const {
  TokenCredentialAuthenticationProvider,
} = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');
const { ClientSecretCredential } = require('@azure/identity');

const credential = new ClientSecretCredential(process.env.TEAMS_TENANT_ID, process.env.TEAMS_CLIENT_ID, process.env.TEAMS_CLIENT_SECRET_VALUE);
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: 'https://graph.microsoft.com/.default',
});

const client = Client.initWithMiddleware({
  debugLogging: true,
  authProvider,
});
const helper = 'ShellyHelper';
const helpee = 'ShellyHelpee';

const onlineMeeting = {
  startDateTime: '2022-04-01T14:30:34.2444915-07:00',
  endDateTime: '2022-04-01T15:00:34.2464912-07:00',
  subject: `Shelpy meeting between ${helper} and ${helpee}`,
  recordAutomatically: true,
};
async function createMeeting() {
  const res = await client
              .api(`/users/${process.env.TEAMS_USER_ID}/onlineMeetings`)
              .post(onlineMeeting); // app permission
  const {
    subject,
    startDateTime,
    endDateTime,
    joinUrl,
    meetingCode,
    lobbyBypassSettings,
  } = res;
  const meetingDetails = {
    subject,
    startDateTime,
    endDateTime,
    joinUrl,
    meetingCode,
    lobbyBypassSettings,
  };
  console.log('meetingDetails: ', meetingDetails);
}

createMeeting();


