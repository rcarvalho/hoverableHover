/*
* hoverableHover
*
* Copyright (c) 2011 Rodney Carvalho
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Version: 0.9
*
* Project home:
* https://github.com/rcarvalho/hoverable-hover
* 
*	description: Kind of like tooltips, but the element that pops can also be
*		hovered on and stays around while you're on it.  The element only gets
*		hidden after you hover off of it.  Currently, you can have many hoverable
*		elements, but only a single popup.  I would like to eventually add 
*		functionality so that you can have one popup per hoverable element.
*
* 	usage: hoverableHover.init( css-selector-hoverable-element, options )
* 
*  	e.g. hoverableHover.init(".hoverableLink", {popup: '#hoverDialog', timeout: 600});
* 
* 	options:
* 		popup - css selector of the popup or dialog that you want to show
*		timeout - timeout delay to hide popup (default is 800ms)
*		beforeShow - callback before popup is shown
*		afterShow - callback after popup is shown
*		beforeHide - callback before popup is hidden
*		afterHide - callback after popup is hidden
*/

hoverableHover = {
	hoverElem: null,
	popup: null,
	timeoutToken: null,
	opts: {},
	init: function(selector, opts){
		if(opts == undefined){
			opts = {};
		}
		hoverableHover.opts = opts;
		var popup = opts.popup;
		var timeout = opts.timeout;

		if(timeout == undefined){
			timeout = 700;
		}
		hoverableHover.popup = popup;
		$(selector).hover(
			function(){
				if($(popup).is(':visible')){
					hoverableHover.hidePopup();
				}
				
				hoverableHover.hoverElem = this;
				
				if(opts.beforeShow){
					opts.beforeShow(this);
				}

				$(popup).show();

				if(opts.afterShow){
					opts.afterShow(this);
				}				
			},
			function(){
				hoverableHover.startTimeout(timeout);
			}
		);

		$(popup).hover(
			function(){
				hoverableHover.cancelTimeout();
			},
			function(){
				hoverableHover.startTimeout(timeout);	
			}
		);
	},
	cancelTimeout: function(){
		if(hoverableHover.timeoutToken){
			clearTimeout(hoverableHover.timeoutToken);	
			hoverableHover.timeoutToken = null;
		}
	},
	startTimeout: function(timeout){
		hoverableHover.timeoutToken = setTimeout("hoverableHover.hidePopup()",timeout);
	},
	hidePopup: function(){
		hoverableHover.cancelTimeout();
		if(hoverableHover.opts.beforeHide){
			hoverableHover.opts.beforeHide(hoverableHover.hoverElem);
		}
		$(hoverableHover.popup).hide();
		if(hoverableHover.opts.afterHide){
			hoverableHover.opts.afterHide(hoverableHover.hoverElem);
		}
	}
}