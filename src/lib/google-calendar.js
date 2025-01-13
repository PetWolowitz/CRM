import { google } from 'googleapis';

// Configurazione OAuth2
const oauth2Client = new google.auth.OAuth2(
  import.meta.env.VITE_GOOGLE_CLIENT_ID,
  import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  import.meta.env.VITE_GOOGLE_REDIRECT_URI
);

// Scopes necessari per Google Calendar
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
}

export async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

export async function syncEvents(events) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  for (const event of events) {
    try {
      await calendar.events.insert({
        calendarId: 'primary',
        resource: {
          summary: event.title,
          description: event.description,
          start: {
            dateTime: event.start,
            timeZone: 'Europe/Rome',
          },
          end: {
            dateTime: event.end,
            timeZone: 'Europe/Rome',
          },
          location: event.location,
        },
      });
    } catch (error) {
      console.error('Error syncing event:', error);
      throw error;
    }
  }
}

export async function getEvents(timeMin, timeMax) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    return response.data.items;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}