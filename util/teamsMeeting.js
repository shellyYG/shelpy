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

async function createMeeting(meeting) {
  const res = await client
    .api(`/users/${process.env.TEAMS_USER_ID}/onlineMeetings`)
    .post(meeting); // app permission
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
  return { meetingDetails };
}

module.exports = {
  createMeeting,
};


