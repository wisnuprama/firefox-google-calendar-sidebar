const sidebarToggle = '_execute_sidebar_action';

// Update UI and set value of textbox
async function updateUI() {
  let commands = await browser.commands.getAll();
  for (command of commands) {
    if (command.name === sidebarToggle) {
      document.querySelector('#shortcut').value = command.shortcut;
    }
  }

  let authuser = '';
  try {
    let res = await browser.storage.sync.get('authuser');
    if ('authuser' in res) {
      authuser = res.authuser;
    }
  } catch (e) {
  }
  document.querySelector('#authuser').value = authuser;
}

// Update shortcut to value of textbox
async function updateShortcut() {
  let authuserValue = document.querySelector("#authuser").value;
  await browser.storage.sync.set({
    authuser: authuserValue
  });

  let url = 'https://calendar.google.com/calendar/companion';
  if (authuserValue !== '') {
    let authuser = encodeURIComponent(authuserValue);
    url = `https://calendar.google.com/calendar/u/${authuser}/companion`;
  }
  browser.sidebarAction.setPanel({
    panel: url
  });

  await browser.commands.update({
    name: sidebarToggle,
    shortcut: document.querySelector('#shortcut').value
  });
}

// Reset shortcut and update textbox
async function resetShortcut() {
  await browser.commands.reset(sidebarToggle);
  updateUI();
}

// Update UI on page load
document.addEventListener('DOMContentLoaded', updateUI);

// Act on update and reset buttons
document.querySelector('#update').addEventListener('click', updateShortcut)
document.querySelector('#reset').addEventListener('click', resetShortcut)
