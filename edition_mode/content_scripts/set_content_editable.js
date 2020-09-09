// Deactivate edition mode on page load
chrome.runtime.sendMessage({action: "deactivate_edition_mode"}, function() {});

// Mutation observer: it is used to make editable all the new elements added dynamically to the page.
var mutationObs = new MutationObserver(function (mutations) {
	for (let i = 0, length = mutations.length; i < length; i++) {
		if (mutations[i].addedNodes[0]) {
			makeEditable(mutations[i].addedNodes[0]);
		}
	};
});

// Boolean employed to know whether the page is currently in 'edition mode' or not
var editionMode = false;

// Handle messages sent from the background script
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

	if (request.action == 'switch_edition_mode') {

		if (!editionMode) {

			$("body").find("*").not("script,style").each(function () {
				makeEditable(this);
			});
			
			// Initialize MutationObserver
			mutationObs.observe(document.body, { childList: true, subtree: true });
			
			editionMode = true;
			sendResponse({edition_mode: "edition_mode_on"});
			
		} else {

			$(".edition-mode-activated-lets-go").each(function () {
				revertEditable(this);
			});

			mutationObs.disconnect();

			editionMode = false;
			sendResponse({edition_mode: "edition_mode_off"});

		}

	}

 	else if (request.poll) {
		if (editionMode)
			sendResponse({edition_mode: "edition_mode_on"});
		else
			sendResponse({edition_mode: "edition_mode_off"});
	}

});

function makeEditable(elem) {

	// Make all non-editable texts editable and mark them with a class
	if (!elem.isContentEditable) {
			$(elem).addClass("edition-mode-activated-lets-go");
			$(elem).attr('contenteditable', 'true');
	}

}

function revertEditable(elem) {
	$(elem).removeClass("edition-mode-activated-lets-go");
	$(elem).attr('contenteditable', 'false');
}