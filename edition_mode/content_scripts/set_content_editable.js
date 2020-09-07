// Regular expression to detect any elements that contains text and letters in it
const letters = /\S+/;

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

var func;

function makeEditable(elem) {
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

function revertEditable(e) {
	
	location.href="javascript: amorypaz(); void 0";

	$(e).removeStop();
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
		var handler = handlers.splice(stopIndex, 1);
	});
};

var i = 0;

// Handle messages sent from the background script
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

	if (request.action == 'switch_edition_mode') {

		if (!editionMode) {

			// var ooopa;

			// if (i == 0) {

			// 	$("body").append(`<input id="hiddensito2" type="hidden">`);
			// 	location.href="javascript: document.querySelector('#hiddensito2').onclick = document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onclick; void 0;";
			// 	location.href="javascript: document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onvolumechange = document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onclick; void 0;";
			// 	location.href="javascript: document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onclick = null; void 0;";

			// 	// location.href="javascript: document.querySelector('#hiddensito2').onclick = document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onclick; void 0";
			// 	// location.href="javascript: document.querySelector('#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button').onclick = null; void 0";
			// 	// debugger;
			// 	i++;
			// 	alert($("#hiddensito2")[0].onclick);
			// }
			
			// else  {
				
			// 	alert($("#hiddensito2")[0].onclick);

			// 	location.href="javascript: document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onclick = document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onvolumechange; void 0;";
			// 	location.href="javascript: document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onvolumechange = null; void 0;";

			// 	// location.href="javascript: document.querySelector(`#js_5f4c17c321efa078188b45c6 > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button`).onclick = document.querySelector('#hiddensito2').onclick; void 0";
			// }


			

			// var s = document.createElement('script');
			// s.id = "script_peep";
			// // TODO: add "script.js" to web_accessible_resources in manifest.json
			// s.src = chrome.runtime.getURL('scripts/hello.js');
			// s.onload = function() {
			// 	this.remove();
			// };
			// (document.head || document.documentElement).appendChild(s);

			// debugger;
			// var ooops = returnOnClickABC("#js_5f182de5fc6c8347628b467f > div:nth-child(2) > div > div > article > div.ue-l-article__body.ue-c-article__body > div.ue-c-article__premium > div.ue-c-article__premium-body > section:nth-child(2) > button");
			
			//  if (i == 0) {

		// } else   {

		// 	location.href="javascript: var xyz = localStorage.getItem('mytime'); amorypaz(); void 0";

		// }

		

			

			// $("body").find("*").not("script,style").each(function () {
			// 	makeEditable(this);
			// });

			location.href="javascript: disableAllClickHandlers(); void 0";
			
			// Initialize MutationObserver
			mutationObs.observe(document.body, { childList: true, subtree: true });
			
			editionMode = true;
			sendResponse({edition_mode: "edition_mode_on"});
			
		} else {

			location.href="javascript: enableAllClickHandlers(); void 0";
			
			// $(".edition-mode-activated-lets-go").each(function () {
			// 	$(this).attr('contenteditable', 'false');
			// 	$(this).removeClass("edition-mode-activated-lets-go");
			// });
			
			// $("body").find("*").not("script,style").each(function () {
			// 	revertEditable(this);
			// });

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

chrome.runtime.sendMessage({action: "deactivate_edition_mode"}, function() {});


$( document ).ready(function() {

	$("body").append(`<input id="hiddensito2" type="hidden">`);

    var s = document.createElement('script');
		// TODO: add "script.js" to web_accessible_resources in manifest.json
		s.src = chrome.runtime.getURL('scripts/bye.js');
		s.onload = function() {
				var s2 = document.createElement('script');
				// TODO: add "script.js" to web_accessible_resources in manifest.json
				s2.src = chrome.runtime.getURL($("#hiddensito2").val() === 'yes' ? 'scripts/hello_jquery.js' : 'scripts/hello.js');
				(document.head || document.documentElement).appendChild(s2);
		};
		(document.head || document.documentElement).appendChild(s);
		
});

