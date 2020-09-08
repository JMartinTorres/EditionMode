function disableClickHandlers() {

	debugger;

	document.querySelectorAll("*").forEach(domElement => {
		addClass(domElement, "edition-mode-click-handlers-off");

		if (!domElement.isContentEditable) {
			addClass(domElement, "edition-mode-activated-lets-go");
			domElement.setAttribute("contenteditable", true);
		}

		if (domElement.onclick) {
			domElement.onvolumechange = domElement.onclick;
			domElement.onclick = null;
		}

	});

	document.querySelectorAll("a").forEach(link => {
		if (link.href) {
			let href = link.href;
			href = "javascript:void(0);" + href;
			link.href = href;
		}
	});

}

function enableClickHandlers() {

	document.querySelectorAll(".edition-mode-click-handlers-off").forEach(domElement => {
		removeClass(domElement, "edition-mode-click-handlers-off");

		if (domElement.onvolumechange) {
			domElement.onclick = domElement.onvolumechange;
			domElement.onvolumechange = null;
		}
	});

	document.querySelectorAll(".edition-mode-activated-lets-go").forEach(domElement => {
		removeClass(domElement, "edition-mode-activated-lets-go");
		domElement.setAttribute("contenteditable", false);
	});

	document.querySelectorAll("a").forEach(link => {
		if (link.href) {
			let href = link.href;
			href = href.substring(href.indexOf("javascript:void(0);") + 19);
			link.href = href;
		}
	});

}

function stop(event) {
	event.stopImmediatePropagation();
	event.preventDefault();
}

// https://jaketrent.com/post/addremove-classes-raw-javascript/
function hasClass(ele, cls) {
	return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
	if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
	if (hasClass(ele, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		ele.className = ele.className.replace(reg, ' ');
	}
}