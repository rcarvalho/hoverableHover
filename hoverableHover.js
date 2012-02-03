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
*	See README.txt for instructions 
*	
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

		$(selector).live('mouseover', function(){
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
		});
		$(selector).live('mouseout',function(){
			hoverableHover.startTimeout(timeout);
		});

		$(popup).live('mouseover', function(){
			hoverableHover.cancelTimeout();
		});
		
		$(popup).live('mouseout', function(){
			hoverableHover.startTimeout(timeout);	
		});
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
};