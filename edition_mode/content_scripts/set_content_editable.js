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

			// location.href="javascript: disableClickHandlers(); void 0";

			$("body").find("*").not("script,style").each(function () {
				makeEditable(this);
			});
			
			// Initialize MutationObserver
			mutationObs.observe(document.body, { childList: true, subtree: true });
			
			editionMode = true;
			sendResponse({edition_mode: "edition_mode_on"});
			
		} else {

			// location.href="javascript: enableClickHandlers(); void 0";

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

// Deactivate edition mode on page load
chrome.runtime.sendMessage({action: "deactivate_edition_mode"}, function() {});

$(document).ready(function() {
	
	
	// $("body").append(`<input id="hidden_input_jquery" type="hidden">`);

    // var s = document.createElement('script');
	// s.src = chrome.runtime.getURL('scripts/check_window_jquery.js');
	// s.onload = function() {
	// 	var s2 = document.createElement('script');
	// 	// TODO: add "script.js" to web_accessible_resources in manifest.json
	// 	s2.src = chrome.runtime.getURL($("#hidden_input_jquery").val() === 'yes' ? 'scripts/toggle_handlers_jquery.js' : 'scripts/toggle_handlers.js');
	// 	s2.src = chrome.runtime.getURL($("#hidden_input_jquery").val() === 'yes' ? 'scripts/toggle_handlers_jquery.js' : 'scripts/toggle_handlers.js');
	// 	(document.head || document.documentElement).appendChild(s2);
	// };

	// (document.head || document.documentElement).appendChild(s);
		
});

function makeEditable(elem) {

	// Make all non-editable texts editable and mark them with a class
	if (!elem.isContentEditable) {
		// if ($(elem).text().match(letters)) {
			$(elem).addClass("edition-mode-activated-lets-go");
			$(elem).attr('contenteditable', 'true');
		// }
	}
}


function makeEditable2(elem) {
	// Prevent all elements from executing their on click actions 😈
	$(elem).addClass("edition-mode-click-handlers-off");
	preventOnClick(elem);

	// Make all non-editable texts editable and mark them with a class
	if (!elem.isContentEditable) {
		// if ($(elem).text().match(letters)) {
			$(elem).addClass("edition-mode-activated-lets-go");
			$(elem).attr('contenteditable', 'true');
		// }
	}
}

function revertEditable(elem) {
	
	$(elem).removeClass("edition-mode-activated-lets-go");
	$(elem).attr('contenteditable', 'false');

	// location.href="javascript: amorypaz(); void 0";

	// $(e).removeStop();
}

function preventOnClick(e) {

	// let onclick_function = $(e)[0].onclick; // Function assigned to onclick attribute (it may not exist)

	// if (onclick_function) {
	// 	$(e).prop('onclick',null);
	// 	$(e).bindFirstClick(onclick_function);
	// }

	
	$(e).prop('onclick',null);
	$(e).bindFirstClick(stop);

}

function stop (event) {
	event.stopImmediatePropagation();
	event.preventDefault();
}

// Handlers assigned to an event via JQuery are executed in a specific order. 
// This function adds a new handler in a manner that, of all the already assigned ones, it is the first that runs.
$.fn.bindFirstClick = function (fn) {
	debugger;
	this.on('click', fn);

	this.each(function () {
		var handlers = $._data(this, 'events').click;
		var handler = handlers.pop();
		handlers.splice(0, 0, handler);
	});
};

$.fn.removeStop = function () {
	debugger;
	this.each(function () {
		let stopIndex = $._data(this, 'events').click.findIndex((handler) => handler.handler.name === "stop")
		var handlers = $._data(this, 'events').click;
		handler = handlers.splice(stopIndex, 1);
	});
};