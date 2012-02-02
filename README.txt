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


styling and positioning:
  In order to get your popup to show up in the right place you need to style
  it properly and make sure that you position it properly.
  
  // sample css styling for popup
  #hoverDialog {
      border-radius: 5px;
      display:none;
      position: absolute;
      top: 0;
      left: 0;
      height: 200px;
      width: 300px;
      background-color: white;
      z-index: 1000;
  }

  // sample javascript to position popup
  function positionPopup(elem){
    $('#hoverDialog').css("left", $(elem).offset().left + 20);
    $('#hoverDialog').css("top", $(elem).offset().top);
  }
  hoverableHover.init(".hoverableLink", {popup: '#hoverDialog', beforeShow: positionPopup });