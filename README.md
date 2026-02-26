# firefox-google-calendar-sidebar
A Firefox WebExtension to display Google Calendar in the sidebar.

## Features

- Display Google Calendar in Firefox sidebar with mobile-responsive daily view
- UI similar to Gmail's calendar sidebar
- Cookie-based authentication (uses your existing Google login)
- Multi-account support via optional authuser parameter
- Customizable keyboard shortcut (default: Shift+Alt+C)

## Installation

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this directory

## Usage

### Opening the Calendar Sidebar

- Press the keyboard shortcut: **Shift+Alt+C** (default)
- Or click the Google Calendar icon in the toolbar
- Or use the View > Sidebar > Google Calendar menu

### Multi-Account Support

If you have multiple Google accounts:

1. Click the extension icon or open the sidebar
2. Go to the extension's options page (right-click the toolbar icon and select "Options")
3. Enter the account number in the "authuser" field:
   - Leave blank for your default account
   - Enter `0` for your first account
   - Enter `1` for your second account
   - Enter `2` for your third account, etc.
4. Click "Update"
5. Toggle the sidebar off and on to apply the change

### Changing the Keyboard Shortcut

1. Go to the extension's options page
2. Enter your preferred keyboard shortcut in the text field
3. Click "Update"

## Requirements

- Firefox 109.0 or higher (Manifest V3 support)
- Active Google account (logged into Google in Firefox)

## How It Works

This extension displays Google Calendar using the `/companion` endpoint, which is the same interface Gmail uses for its calendar sidebar. It provides a mobile-optimized daily view that fits perfectly in Firefox's sidebar.

Authentication is handled automatically through your browser's existing Google cookies, so no additional login is required.

## Credits

This extension is based on:
- [firefox-google-tasks-sidebar](https://github.com/lltcggie/firefox-google-tasks-sidebar) by lltcggie
- Original [firefox-todoist-sidebar](https://github.com/theoosborn/firefox-todoist-sidebar) by Theo Osborn

## License

See LICENSE file for details.
