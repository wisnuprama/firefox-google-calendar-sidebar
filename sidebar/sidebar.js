"use strict";

setLocation();

function getCalendarUrl(authUser, view) {
  if (view === "desktop") {
    return `https://calendar.google.com/calendar/u/${authUser}/r`;
  }
  return `https://calendar.google.com/calendar/u/${authUser}/gp?hl=en`;
}

async function setLocation() {
  const defaultAuthUser = "0";
  let authUser = defaultAuthUser;
  let view = "mobile";
  try {
    let res = await browser.storage.sync.get(["authuser", "view"]);

    if ("authuser" in res && res.authuser !== "") {
      authUser = encodeURIComponent(res.authuser);
    }
    if ("view" in res) {
      view = res.view;
    }
  } catch (e) {}

  let url = getCalendarUrl(authUser, view);

  browser.sidebarAction.setPanel({
    panel: url,

  });
}
