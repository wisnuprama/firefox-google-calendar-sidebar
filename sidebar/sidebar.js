"use strict";

setLocation();

function getCalendarUrl(authUser) {
  return `https://calendar.google.com/calendar/u/${authUser}/gp?hl=en`;
}

async function setLocation() {
  const defaultAuthUser = "0";
  let url = getCalendarUrl(defaultAuthUser);
  try {
    let res = await browser.storage.sync.get("authuser");

    if ("authuser" in res && res.authuser !== "") {
      const authuser = encodeURIComponent(res.authuser);
      url = getCalendarUrl(authuser);
    }
  } catch (e) {}

  browser.sidebarAction.setPanel({
    panel: url,

  });
}
