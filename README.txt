hoverableHover

requires: jQuery (but, it not a jQuery plugin itself)

description: Kind of like tooltips, but the element that pops can also be
	hovered on and stays around while you're on it.  The element only gets
	hidden after you hover off of it.  Currently, you can have many hoverable
	elements, but only a single popup.  I would like to eventually add 
	functionality so that you can have one popup per hoverable element.

usage: hoverableHover.init( css-selector-hoverable-element, options )

  e.g. hoverableHover.init(".hoverableLink", {popup: '#hoverDialog', timeout: 600});


options:
	popup - css selector of the popup or dialog that you want to show
	timeout - timeout delay to hide popup (default is 700ms)
	beforeShow - callback before popup is shown
	afterShow - callback after popup is shown
	beforeHide - callback before popup is hidden
	afterHide - callback after popup is hidden

