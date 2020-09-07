
function disableAllClickHandlers() {

	debugger;

	document.querySelectorAll("a").forEach(fakeImage => {
		if (fakeImage.href) {
			let href = fakeImage.href;
			href = "javascript:void(0);" + href;
			fakeImage.href = href;
		}
	});

	document.querySelectorAll("*").forEach(fakeImage => {

		makeEditable_noJQuery(fakeImage);

	});



}

function enableAllClickHandlers() {

	document.querySelectorAll("*").forEach(fakeImage => {
		if (fakeImage.onvolumechange) {
			fakeImage.onclick = fakeImage.onvolumechange;
			fakeImage.onvolumechange = null;
		}
	});

}

function makeEditable_noJQuery(fakeImage) {

	addClass(fakeImage, "edition-mode-click-handlers-off");

	if (fakeImage.onclick) {
		fakeImage.onvolumechange = fakeImage.onclick;
		fakeImage.onclick = null;
	}

	if (!fakeImage.isContentEditable) {
		addClass(fakeImage, "edition-mode-activated-lets-go");
		fakeImage.setAttribute("contenteditable", true);
	}

}


function revertEditable(e) {
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