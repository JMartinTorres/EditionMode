function iconEditionModeOn() {
    chrome.browserAction.setTitle({ title: "Stop Edition Mode" });
    chrome.browserAction.setIcon({ path: "extension_icons/editionmode-active-16.png" });
}

function iconEditionModeOff() {
    chrome.browserAction.setTitle({ title: "Start Edition Mode" });
    chrome.browserAction.setIcon({ path: "extension_icons/editionmode-inactive-16.png" });
}

// Handle messages sent from the background script
chrome.extension.onMessage.addListener(function (request) {

	if (request.action == 'deactivate_edition_mode') {
        iconEditionModeOff();
	}

});

// On tab change
chrome.tabs.onActivated.addListener(function (activeInfo) {

    chrome.tabs.sendMessage(activeInfo.tabId, { poll: "is_edition_activated" }, function (response) {
        if (response.edition_mode == 'edition_mode_on') {
            iconEditionModeOn();
        } else {
            iconEditionModeOff();
        }
    });

});

// Icon click action
chrome.browserAction.onClicked.addListener(function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        chrome.tabs.sendMessage(tabs[0].id, { action: "switch_edition_mode" }, function (response) {
            debugger;
            if (response.edition_mode == 'edition_mode_on') {
                iconEditionModeOn();
            } else {
                iconEditionModeOff();
            }
        });

    });

});

// // On tab refresh
// chrome.tabs.onUpdated.addListener(function () {
//     iconEditionModeOff();
// });
