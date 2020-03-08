$( document ).ready(function() {

	var letters = /\S+/;

    $("body").find("*").dblclick(function (e) {
		
		// if ($(this).is("text")) {
			
			// let a = $(this)
				// .clone()    //clone the element
				// .children() //select all the children
				// .remove()   //remove all the children
				// .end()  //again go back to selected element
				// .text();
		
			if ($(this).text().match(letters))
				$(this).attr('contenteditable','true');
			
			// console.log ($(this).text())
		
			// if ($(this).find($("text").length > 0)) {
				// console.log ($(this).get(0).nodeType);
				// //alert($(this).text());
				// //e.stopPropagation();
			// }
	
		// }

    });

});