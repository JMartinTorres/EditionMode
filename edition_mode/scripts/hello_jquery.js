
function disableAllClickHandlers() {
	
	debugger;

		$("a").each(function () {
			if ($(this).attr("href")) {
				debugger;
				let href = $(this).attr("href");
				href = "javascript:void(0);" + href;
				$(this).attr("href", href);
			}
		});
		
		$("body").find("*").not("script,style").each(function () {
			makeEditable(this);
		});
	

}

function enableAllClickHandlers() {

		$(".edition-mode-activated-lets-go").each(function () {
			$(this).attr('contenteditable', 'false');
			$(this).removeClass("edition-mode-activated-lets-go");
		});

		$("body").find("*").not("script,style").each(function () {
			revertEditable(this);
		});

		$("a").each(function () {
			if ($(this).attr("href")) {
				debugger;
				let href = $(this).attr("href");
				href = href.substring(href.indexOf("javascript:void(0);") + 19);
				$(this).attr("href", href);
			}
		});

	
}


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
	$(e).removeStop();
}

function preventOnClick(e) {

	let onclick_function = $(e)[0].onclick; // Function assigned to onclick attribute (it may not exist)

	if (onclick_function) {
		$(e).prop('onclick', null);
		$(e).bindFirstClick(onclick_function);
	}


	$(e).prop('onclick', null);
	$(e).bindFirstClick(stop);

}

function stop(event) {
	event.stopImmediatePropagation();
	event.preventDefault();
}

$.fn.bindFirstClick = function (fn) {
	this.on('click', fn);

	this.each(function () {
		var handlers = $._data(this, 'events').click;
		var handler = handlers.pop();
		handlers.splice(0, 0, handler);
	});
};

$.fn.removeStop = function () {
	this.each(function () {
		let stopIndex = $._data(this, 'events').click.findIndex((handler) => handler.handler.name === "stop")
		var handlers = $._data(this, 'events').click;
		handlers.splice(stopIndex, 1);
	});
};
