'use strict';

setLocation();

async function setLocation() {
  let url = 'https://calendar.google.com/calendar/companion';
  try {
    let res = await browser.storage.sync.get('authuser');
    if ('authuser' in res && res.authuser !== '') {
      let authuser = encodeURIComponent(res.authuser);
      url = `https://calendar.google.com/calendar/u/${authuser}/companion`;
    }
  } catch (e) {
  }

  browser.sidebarAction.setPanel({
    panel: url
  })
}
