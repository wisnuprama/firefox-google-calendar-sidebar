const sidebarToggle = "_execute_sidebar_action";

const DEFAULT_AUTHUSER = "0";

function getCalendarUrl(authUser, view) {
  if (view === "desktop") {
    return `https://calendar.google.com/calendar/u/${authUser}/r`;
  }
  return `https://calendar.google.com/calendar/u/${authUser}/gp?hl=en`;
}

// Update UI and set value of textbox
async function updateUI() {
  let commands = await browser.commands.getAll();
  for (command of commands) {
    if (command.name === sidebarToggle) {
      document.querySelector("#shortcut").value = command.shortcut;
    }
  }

  let authuser = "";
  let view = "mobile";
  try {
    let res = await browser.storage.sync.get(["authuser", "view"]);
    if ("authuser" in res) {
      authuser = res.authuser;
    }
    if ("view" in res) {
      view = res.view;
    }
  } catch (e) {}
  document.querySelector("#authuser").value = authuser;
  document.querySelector("#view").value = view;
}

// Update shortcut to value of textbox
async function updateShortcut() {
  let authuserValue = document.querySelector("#authuser").value;
  let viewValue = document.querySelector("#view").value;
  await browser.storage.sync.set({
    authuser: authuserValue,
    view: viewValue,
  });

  let authuser = authuserValue !== "" ? encodeURIComponent(authuserValue) : DEFAULT_AUTHUSER;
  let url = getCalendarUrl(authuser, viewValue);
  browser.sidebarAction.setPanel({
    panel: url,
  });

  await browser.commands.update({
    name: sidebarToggle,
    shortcut: document.querySelector("#shortcut").value,
  });
}

// Reset shortcut and update textbox
async function resetShortcut() {
  await browser.commands.reset(sidebarToggle);
  updateUI();
}

// Update UI on page load
document.addEventListener("DOMContentLoaded", updateUI);

// Act on update and reset buttons
document.querySelector("#update").addEventListener("click", updateShortcut);
document.querySelector("#reset").addEventListener("click", resetShortcut);
