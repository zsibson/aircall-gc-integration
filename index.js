require('dotenv').config()

async function getCalendarList() {
    const url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${user.google_oauth_token}`
      }
    });
  
    const data = await response.json();
    return data;
  }
  
  async function getEvents() {
    const calendarList = await getCalendarList();
    const calendar = calendarList.items[0];
    if (!calendar) {
      return;
    }
  
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${user.google_oauth_token}`
      }
    });
  
    const data = await response.json();
    return data;
  }

async function subscribeCalendarNotifications() {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${user.google_calendar_id}/events/watch`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.google_oauth_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'unique-channel-id',
        type: 'web_hook',
        address: '/webhooks/google/notifications',
      }),
    });
  
    const data = await response.json();
    return data;
  }
  
