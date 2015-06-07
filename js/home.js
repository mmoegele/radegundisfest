/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */

// See the Getting Started docs for more information:
// http://getbootstrap.com/getting-started/#support-ie10-width

!function(){"use strict";if(navigator.userAgent.match(/IEMobile\/10\.0/)){var e=document.createElement("style");e.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.querySelector("head").appendChild(e)}}();


/*!
 * Bootstrap-dialog
 */
!function(t,e){"use strict";"undefined"!=typeof module&&module.exports?module.exports=e(require("jquery"),require("bootstrap")):"function"==typeof define&&define.amd?define("bootstrap-dialog",["jquery"],function(t){return e(t)}):t.BootstrapDialog=e(t.jQuery)}(this,function(t){"use strict";var e=t.fn.modal.Constructor,n=function(t,n){e.call(this,t,n)};n.getModalVersion=function(){var e=null;return e="undefined"==typeof t.fn.modal.Constructor.VERSION?"v3.1":/3\.2\.\d+/.test(t.fn.modal.Constructor.VERSION)?"v3.2":/3\.3\.[1,2]/.test(t.fn.modal.Constructor.VERSION)?"v3.3":"v3.3.4"},n.ORIGINAL_BODY_PADDING=t("body").css("padding-right")||0,n.METHODS_TO_OVERRIDE={},n.METHODS_TO_OVERRIDE["v3.1"]={},n.METHODS_TO_OVERRIDE["v3.2"]={hide:function(e){if(e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()){this.isShown=!1;var n=this.getGlobalOpenedDialogs();0===n.length&&this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}}},n.METHODS_TO_OVERRIDE["v3.3"]={setScrollbar:function(){var t=n.ORIGINAL_BODY_PADDING;this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},resetScrollbar:function(){var t=this.getGlobalOpenedDialogs();0===t.length&&this.$body.css("padding-right",n.ORIGINAL_BODY_PADDING)},hideModal:function(){this.$element.hide(),this.backdrop(t.proxy(function(){var t=this.getGlobalOpenedDialogs();0===t.length&&this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$element.trigger("hidden.bs.modal")},this))}},n.METHODS_TO_OVERRIDE["v3.3.4"]=t.extend({},n.METHODS_TO_OVERRIDE["v3.3"]),n.prototype={constructor:n,getGlobalOpenedDialogs:function(){var e=[];return t.each(o.dialogs,function(t,n){n.isRealized()&&n.isOpened()&&e.push(n)}),e}},n.prototype=t.extend(n.prototype,e.prototype,n.METHODS_TO_OVERRIDE[n.getModalVersion()]);var o=function(e){this.defaultOptions=t.extend(!0,{id:o.newGuid(),buttons:[],data:{},onshow:null,onshown:null,onhide:null,onhidden:null},o.defaultOptions),this.indexedButtons={},this.registeredButtonHotkeys={},this.draggableData={isMouseDown:!1,mouseOffset:{}},this.realized=!1,this.opened=!1,this.initOptions(e),this.holdThisInstance()};return o.BootstrapDialogModal=n,o.NAMESPACE="bootstrap-dialog",o.TYPE_DEFAULT="type-default",o.TYPE_INFO="type-info",o.TYPE_PRIMARY="type-primary",o.TYPE_SUCCESS="type-success",o.TYPE_WARNING="type-warning",o.TYPE_DANGER="type-danger",o.DEFAULT_TEXTS={},o.DEFAULT_TEXTS[o.TYPE_DEFAULT]="Information",o.DEFAULT_TEXTS[o.TYPE_INFO]="Information",o.DEFAULT_TEXTS[o.TYPE_PRIMARY]="Information",o.DEFAULT_TEXTS[o.TYPE_SUCCESS]="Success",o.DEFAULT_TEXTS[o.TYPE_WARNING]="Warning",o.DEFAULT_TEXTS[o.TYPE_DANGER]="Danger",o.DEFAULT_TEXTS.OK="OK",o.DEFAULT_TEXTS.CANCEL="Cancel",o.DEFAULT_TEXTS.CONFIRM="Confirmation",o.SIZE_NORMAL="size-normal",o.SIZE_SMALL="size-small",o.SIZE_WIDE="size-wide",o.SIZE_LARGE="size-large",o.BUTTON_SIZES={},o.BUTTON_SIZES[o.SIZE_NORMAL]="",o.BUTTON_SIZES[o.SIZE_SMALL]="",o.BUTTON_SIZES[o.SIZE_WIDE]="",o.BUTTON_SIZES[o.SIZE_LARGE]="btn-lg",o.ICON_SPINNER="glyphicon glyphicon-asterisk",o.defaultOptions={type:o.TYPE_PRIMARY,size:o.SIZE_NORMAL,cssClass:"",title:null,message:null,nl2br:!0,closable:!0,closeByBackdrop:!0,closeByKeyboard:!0,spinicon:o.ICON_SPINNER,autodestroy:!0,draggable:!1,animate:!0,description:""},o.configDefaultOptions=function(e){o.defaultOptions=t.extend(!0,o.defaultOptions,e)},o.dialogs={},o.openAll=function(){t.each(o.dialogs,function(t,e){e.open()})},o.closeAll=function(){t.each(o.dialogs,function(t,e){e.close()})},o.moveFocus=function(){var e=null;t.each(o.dialogs,function(t,n){e=n}),null!==e&&e.isRealized()&&e.getModal().focus()},o.METHODS_TO_OVERRIDE={},o.METHODS_TO_OVERRIDE["v3.1"]={handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(t){t.target===this&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByBackdrop()&&t.data.dialog.close()}),this},updateZIndex:function(){var e=1040,n=1050,i=0;t.each(o.dialogs,function(t,e){i++});var s=this.getModal(),a=s.data("bs.modal").$backdrop;return s.css("z-index",n+20*(i-1)),a.css("z-index",e+20*(i-1)),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this.updateZIndex(),this}},o.METHODS_TO_OVERRIDE["v3.2"]={handleModalBackdropEvent:o.METHODS_TO_OVERRIDE["v3.1"].handleModalBackdropEvent,updateZIndex:o.METHODS_TO_OVERRIDE["v3.1"].updateZIndex,open:o.METHODS_TO_OVERRIDE["v3.1"].open},o.METHODS_TO_OVERRIDE["v3.3"]={},o.METHODS_TO_OVERRIDE["v3.3.4"]=t.extend({},o.METHODS_TO_OVERRIDE["v3.1"]),o.prototype={constructor:o,initOptions:function(e){return this.options=t.extend(!0,this.defaultOptions,e),this},holdThisInstance:function(){return o.dialogs[this.getId()]=this,this},initModalStuff:function(){return this.setModal(this.createModal()).setModalDialog(this.createModalDialog()).setModalContent(this.createModalContent()).setModalHeader(this.createModalHeader()).setModalBody(this.createModalBody()).setModalFooter(this.createModalFooter()),this.getModal().append(this.getModalDialog()),this.getModalDialog().append(this.getModalContent()),this.getModalContent().append(this.getModalHeader()).append(this.getModalBody()).append(this.getModalFooter()),this},createModal:function(){var e=t('<div class="modal" tabindex="-1" role="dialog" aria-hidden="true"></div>');return e.prop("id",this.getId()).attr("aria-labelledby",this.getId()+"_title"),e},getModal:function(){return this.$modal},setModal:function(t){return this.$modal=t,this},createModalDialog:function(){return t('<div class="modal-dialog"></div>')},getModalDialog:function(){return this.$modalDialog},setModalDialog:function(t){return this.$modalDialog=t,this},createModalContent:function(){return t('<div class="modal-content"></div>')},getModalContent:function(){return this.$modalContent},setModalContent:function(t){return this.$modalContent=t,this},createModalHeader:function(){return t('<div class="modal-header"></div>')},getModalHeader:function(){return this.$modalHeader},setModalHeader:function(t){return this.$modalHeader=t,this},createModalBody:function(){return t('<div class="modal-body"></div>')},getModalBody:function(){return this.$modalBody},setModalBody:function(t){return this.$modalBody=t,this},createModalFooter:function(){return t('<div class="modal-footer"></div>')},getModalFooter:function(){return this.$modalFooter},setModalFooter:function(t){return this.$modalFooter=t,this},createDynamicContent:function(t){var e=null;return e="function"==typeof t?t.call(t,this):t,"string"==typeof e&&(e=this.formatStringContent(e)),e},formatStringContent:function(t){return this.options.nl2br?t.replace(/\r\n/g,"<br />").replace(/[\r\n]/g,"<br />"):t},setData:function(t,e){return this.options.data[t]=e,this},getData:function(t){return this.options.data[t]},setId:function(t){return this.options.id=t,this},getId:function(){return this.options.id},getType:function(){return this.options.type},setType:function(t){return this.options.type=t,this.updateType(),this},updateType:function(){if(this.isRealized()){var t=[o.TYPE_DEFAULT,o.TYPE_INFO,o.TYPE_PRIMARY,o.TYPE_SUCCESS,o.TYPE_WARNING,o.TYPE_DANGER];this.getModal().removeClass(t.join(" ")).addClass(this.getType())}return this},getSize:function(){return this.options.size},setSize:function(t){return this.options.size=t,this.updateSize(),this},updateSize:function(){if(this.isRealized()){var e=this;this.getModal().removeClass(o.SIZE_NORMAL).removeClass(o.SIZE_SMALL).removeClass(o.SIZE_WIDE).removeClass(o.SIZE_LARGE),this.getModal().addClass(this.getSize()),this.getModalDialog().removeClass("modal-sm"),this.getSize()===o.SIZE_SMALL&&this.getModalDialog().addClass("modal-sm"),this.getModalDialog().removeClass("modal-lg"),this.getSize()===o.SIZE_WIDE&&this.getModalDialog().addClass("modal-lg"),t.each(this.options.buttons,function(n,o){var i=e.getButton(o.id),s=["btn-lg","btn-sm","btn-xs"],a=!1;if("string"==typeof o.cssClass){var d=o.cssClass.split(" ");t.each(d,function(e,n){-1!==t.inArray(n,s)&&(a=!0)})}a||(i.removeClass(s.join(" ")),i.addClass(e.getButtonSize()))})}return this},getCssClass:function(){return this.options.cssClass},setCssClass:function(t){return this.options.cssClass=t,this},getTitle:function(){return this.options.title},setTitle:function(t){return this.options.title=t,this.updateTitle(),this},updateTitle:function(){if(this.isRealized()){var t=null!==this.getTitle()?this.createDynamicContent(this.getTitle()):this.getDefaultText();this.getModalHeader().find("."+this.getNamespace("title")).html("").append(t).prop("id",this.getId()+"_title")}return this},getMessage:function(){return this.options.message},setMessage:function(t){return this.options.message=t,this.updateMessage(),this},updateMessage:function(){if(this.isRealized()){var t=this.createDynamicContent(this.getMessage());this.getModalBody().find("."+this.getNamespace("message")).html("").append(t)}return this},isClosable:function(){return this.options.closable},setClosable:function(t){return this.options.closable=t,this.updateClosable(),this},setCloseByBackdrop:function(t){return this.options.closeByBackdrop=t,this},canCloseByBackdrop:function(){return this.options.closeByBackdrop},setCloseByKeyboard:function(t){return this.options.closeByKeyboard=t,this},canCloseByKeyboard:function(){return this.options.closeByKeyboard},isAnimate:function(){return this.options.animate},setAnimate:function(t){return this.options.animate=t,this},updateAnimate:function(){return this.isRealized()&&this.getModal().toggleClass("fade",this.isAnimate()),this},getSpinicon:function(){return this.options.spinicon},setSpinicon:function(t){return this.options.spinicon=t,this},addButton:function(t){return this.options.buttons.push(t),this},addButtons:function(e){var n=this;return t.each(e,function(t,e){n.addButton(e)}),this},getButtons:function(){return this.options.buttons},setButtons:function(t){return this.options.buttons=t,this.updateButtons(),this},getButton:function(t){return"undefined"!=typeof this.indexedButtons[t]?this.indexedButtons[t]:null},getButtonSize:function(){return"undefined"!=typeof o.BUTTON_SIZES[this.getSize()]?o.BUTTON_SIZES[this.getSize()]:""},updateButtons:function(){return this.isRealized()&&(0===this.getButtons().length?this.getModalFooter().hide():this.getModalFooter().show().find("."+this.getNamespace("footer")).html("").append(this.createFooterButtons())),this},isAutodestroy:function(){return this.options.autodestroy},setAutodestroy:function(t){this.options.autodestroy=t},getDescription:function(){return this.options.description},setDescription:function(t){return this.options.description=t,this},getDefaultText:function(){return o.DEFAULT_TEXTS[this.getType()]},getNamespace:function(t){return o.NAMESPACE+"-"+t},createHeaderContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("header")),e.append(this.createTitleContent()),e.prepend(this.createCloseButton()),e},createTitleContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("title")),e},createCloseButton:function(){var e=t("<div></div>");e.addClass(this.getNamespace("close-button"));var n=t('<button class="close">&times;</button>');return e.append(n),e.on("click",{dialog:this},function(t){t.data.dialog.close()}),e},createBodyContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("body")),e.append(this.createMessageContent()),e},createMessageContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("message")),e},createFooterContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("footer")),e},createFooterButtons:function(){var e=this,n=t("<div></div>");return n.addClass(this.getNamespace("footer-buttons")),this.indexedButtons={},t.each(this.options.buttons,function(t,i){i.id||(i.id=o.newGuid());var s=e.createButton(i);e.indexedButtons[i.id]=s,n.append(s)}),n},createButton:function(e){var n=t('<button class="btn"></button>');return n.prop("id",e.id),n.data("button",e),"undefined"!=typeof e.icon&&""!==t.trim(e.icon)&&n.append(this.createButtonIcon(e.icon)),"undefined"!=typeof e.label&&n.append(e.label),n.addClass("undefined"!=typeof e.cssClass&&""!==t.trim(e.cssClass)?e.cssClass:"btn-default"),"undefined"!=typeof e.hotkey&&(this.registeredButtonHotkeys[e.hotkey]=n),n.on("click",{dialog:this,$button:n,button:e},function(t){var e=t.data.dialog,n=t.data.$button,o=n.data("button");"function"==typeof o.action&&o.action.call(n,e,t),o.autospin&&n.toggleSpin(!0)}),this.enhanceButton(n),n},enhanceButton:function(t){return t.dialog=this,t.toggleEnable=function(t){var e=this;return"undefined"!=typeof t?e.prop("disabled",!t).toggleClass("disabled",!t):e.prop("disabled",!e.prop("disabled")),e},t.enable=function(){var t=this;return t.toggleEnable(!0),t},t.disable=function(){var t=this;return t.toggleEnable(!1),t},t.toggleSpin=function(e){var n=this,o=n.dialog,i=n.find("."+o.getNamespace("button-icon"));return"undefined"==typeof e&&(e=!(t.find(".icon-spin").length>0)),e?(i.hide(),t.prepend(o.createButtonIcon(o.getSpinicon()).addClass("icon-spin"))):(i.show(),t.find(".icon-spin").remove()),n},t.spin=function(){var t=this;return t.toggleSpin(!0),t},t.stopSpin=function(){var t=this;return t.toggleSpin(!1),t},this},createButtonIcon:function(e){var n=t("<span></span>");return n.addClass(this.getNamespace("button-icon")).addClass(e),n},enableButtons:function(e){return t.each(this.indexedButtons,function(t,n){n.toggleEnable(e)}),this},updateClosable:function(){return this.isRealized()&&this.getModalHeader().find("."+this.getNamespace("close-button")).toggle(this.isClosable()),this},onShow:function(t){return this.options.onshow=t,this},onShown:function(t){return this.options.onshown=t,this},onHide:function(t){return this.options.onhide=t,this},onHidden:function(t){return this.options.onhidden=t,this},isRealized:function(){return this.realized},setRealized:function(t){return this.realized=t,this},isOpened:function(){return this.opened},setOpened:function(t){return this.opened=t,this},handleModalEvents:function(){return this.getModal().on("show.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!0),e.isModalEvent(t)&&"function"==typeof e.options.onshow){var n=e.options.onshow(e);return n===!1&&e.setOpened(!1),n}}),this.getModal().on("shown.bs.modal",{dialog:this},function(t){var e=t.data.dialog;e.isModalEvent(t)&&"function"==typeof e.options.onshown&&e.options.onshown(e)}),this.getModal().on("hide.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!1),e.isModalEvent(t)&&"function"==typeof e.options.onhide){var n=e.options.onhide(e);return n===!1&&e.setOpened(!0),n}}),this.getModal().on("hidden.bs.modal",{dialog:this},function(e){var n=e.data.dialog;n.isModalEvent(e)&&"function"==typeof n.options.onhidden&&n.options.onhidden(n),n.isAutodestroy()&&(delete o.dialogs[n.getId()],t(this).remove()),o.moveFocus()}),this.handleModalBackdropEvent(),this.getModal().on("keyup",{dialog:this},function(t){27===t.which&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByKeyboard()&&t.data.dialog.close()}),this.getModal().on("keyup",{dialog:this},function(e){var n=e.data.dialog;if("undefined"!=typeof n.registeredButtonHotkeys[e.which]){var o=t(n.registeredButtonHotkeys[e.which]);!o.prop("disabled")&&o.focus().trigger("click")}}),this},handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(e){t(e.target).hasClass("modal-backdrop")&&e.data.dialog.isClosable()&&e.data.dialog.canCloseByBackdrop()&&e.data.dialog.close()}),this},isModalEvent:function(t){return"undefined"!=typeof t.namespace&&"bs.modal"===t.namespace},makeModalDraggable:function(){return this.options.draggable&&(this.getModalHeader().addClass(this.getNamespace("draggable")).on("mousedown",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown=!0;var n=e.getModalDialog().offset();e.draggableData.mouseOffset={top:t.clientY-n.top,left:t.clientX-n.left}}),this.getModal().on("mouseup mouseleave",{dialog:this},function(t){t.data.dialog.draggableData.isMouseDown=!1}),t("body").on("mousemove",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown&&e.getModalDialog().offset({top:t.clientY-e.draggableData.mouseOffset.top,left:t.clientX-e.draggableData.mouseOffset.left})})),this},realize:function(){return this.initModalStuff(),this.getModal().addClass(o.NAMESPACE).addClass(this.getCssClass()),this.updateSize(),this.getDescription()&&this.getModal().attr("aria-describedby",this.getDescription()),this.getModalFooter().append(this.createFooterContent()),this.getModalHeader().append(this.createHeaderContent()),this.getModalBody().append(this.createBodyContent()),this.getModal().data("bs.modal",new n(this.getModal(),{backdrop:"static",keyboard:!1,show:!1})),this.makeModalDraggable(),this.handleModalEvents(),this.setRealized(!0),this.updateButtons(),this.updateType(),this.updateTitle(),this.updateMessage(),this.updateClosable(),this.updateAnimate(),this.updateSize(),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this},close:function(){return this.getModal().modal("hide"),this}},o.prototype=t.extend(o.prototype,o.METHODS_TO_OVERRIDE[n.getModalVersion()]),o.newGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,n="x"===t?e:3&e|8;return n.toString(16)})},o.show=function(t){return new o(t).open()},o.alert=function(){var e={},n={type:o.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,buttonLabel:o.DEFAULT_TEXTS.OK,callback:null};return e="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?t.extend(!0,n,arguments[0]):t.extend(!0,n,{message:arguments[0],callback:"undefined"!=typeof arguments[1]?arguments[1]:null}),new o({type:e.type,title:e.title,message:e.message,closable:e.closable,draggable:e.draggable,data:{callback:e.callback},onhide:function(t){!t.getData("btnClicked")&&t.isClosable()&&"function"==typeof t.getData("callback")&&t.getData("callback")(!1)},buttons:[{label:e.buttonLabel,action:function(t){t.setData("btnClicked",!0),"function"==typeof t.getData("callback")&&t.getData("callback")(!0),t.close()}}]}).open()},o.confirm=function(){var e={},n={type:o.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,btnCancelLabel:o.DEFAULT_TEXTS.CANCEL,btnOKLabel:o.DEFAULT_TEXTS.OK,btnOKClass:null,callback:null};return e="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?t.extend(!0,n,arguments[0]):t.extend(!0,n,{message:arguments[0],closable:!1,buttonLabel:o.DEFAULT_TEXTS.OK,callback:"undefined"!=typeof arguments[1]?arguments[1]:null}),null===e.btnOKClass&&(e.btnOKClass=["btn",e.type.split("-")[1]].join("-")),new o({type:e.type,title:e.title,message:e.message,closable:e.closable,draggable:e.draggable,data:{callback:e.callback},buttons:[{label:e.btnCancelLabel,action:function(t){"function"==typeof t.getData("callback")&&t.getData("callback")(!1),t.close()}},{label:e.btnOKLabel,cssClass:e.btnOKClass,action:function(t){"function"==typeof t.getData("callback")&&t.getData("callback")(!0),t.close()}}]}).open()},o.warning=function(t,e){return new o({type:o.TYPE_WARNING,message:t}).open()},o.danger=function(t,e){return new o({type:o.TYPE_DANGER,message:t}).open()},o.success=function(t,e){return new o({type:o.TYPE_SUCCESS,message:t}).open()},o});

/*!
 * JavaScript Cookie v2.0.0-pre
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl
 * Released under the MIT license
 */
!function(a){if("function"==typeof define&&define.amd)define(a);else if("object"==typeof exports)module.exports=a();else{var b=window.Cookies,c=window.Cookies=a(window.jQuery);c.noConflict=function(){return window.Cookies=b,c}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(i){}return e=encodeURIComponent(String(e)),e=e.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=[b,"=",e,f.expires&&"; expires="+f.expires.toUTCString(),f.path&&"; path="+f.path,f.domain&&"; domain="+f.domain,f.secure&&"; secure"].join("")}b||(g={});for(var j=document.cookie?document.cookie.split("; "):[],k=/(%[0-9A-Z]{2})+/g,l=0;l<j.length;l++){var m=j[l].split("="),n=m[0].replace(k,decodeURIComponent),o=m.slice(1).join("=");if('"'===o.charAt(0)&&(o=o.slice(1,-1)),o=c&&c(o,n)||o.replace(k,decodeURIComponent),this.json)try{o=JSON.parse(o)}catch(i){}if(b===n){g=o;break}b||(g[n]=o)}return g}return d.get=d.set=d,d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b()});

/*!

 * CUSTOM SCRIPTS

 */
jQuery(function($) {
		var ismodern = !!(window.history && history.pushState);
		
		//ismodern = false;
		
		var getpath = function (full) {
			if (full) {
				return window.location.href.replace(window.location.href.split('/').pop(),"");
			} else {
				var port = ( !!window.location.port ) ? ":"+window.location.port : "";
				return window.location.href.replace(window.location.href.split('/').pop(),"").replace(window.location.protocol + "//" + window.location.hostname + port,"");
			}
		}
		
		var gototarget = function (url) {
			var currentpath = getpath();

			url = url || "";

			if (url.charAt(0) !== "/") url = currentpath+url 

			var newpath = url.substring(0,url.lastIndexOf("/")+1);
			
			if ( newpath === currentpath) {
				var target = url.replace(newpath,"").split(".html")[0];

				if ( target === "") {
					url = currentpath;
					target = "landing";
				}

				if ( ismodern ) {
					history.pushState({}, '', url);
					render();
				} else { 
					window.location.hash = target;
				}
			} else {
				window.location.href = window.location.protocol + "//" + window.location.hostname + url ;
			}
		}
		
		var render = function() {
			
			var hash = window.location.hash.slice(1);
			var url = (window.location.href.split('/').pop().split(".html")[0]).replace(window.location.hash,"");
			
			if (url && !ismodern) {
				var hname = url ? "#"+url : "";
				
				// Force a page refresh with hashtag
				window.location.href = getpath()+hname;
			}
			
			if (hash && ismodern) {
				
				// Force a page refresh with url
				window.location.href = getpath()+hash+".html";
			}
			
			var target = hash ? hash : url;
			
			// Suche nach Seite
			target = target || "landing";
			var targetelement = $("body > article[data-content="+target+"]");
			
			// Falls nicht gefunden
			if (targetelement.length === 0) targetelement = $("body > article[data-content=404]");
			
			// Doctitle abfragen
			var doctitle = $(targetelement).data("doctitle");
			if (!doctitle) doctitle = target.charAt(0).toUpperCase() + target.slice(1); // Fallback
			
			// Content anzeigen
			$("body > article[data-content]").addClass("hidden");
			targetelement.removeClass("hidden");

			// Navbar Menüitem active setzen
			var $li = $("nav.navbar li").removeClass("active");
			$li.has("a[href='"+target+".html']").addClass("active");
			if (target === "landing") $li.has("a[href='/']").addClass("active");

			// Document Title ändern
			document.title = doctitle;
			
			// Cookie Richtlinien umsetzen (erster Track ohne Cookies)
			if (!Cookies.get('rade-consent')) {
				if ($("#cookiewarning").length === 0) {
					var cookiecontainer = $('<div id="cookiewarning" style="padding-top:5px; border-bottom:3px solid #f1ce00;padding-bottom: 5px" class="container-fluid">');
					var cookietext = $('<span>').html('Diese Seite verwendet Cookies, um Ihnen die bestmöglichste Bedienbarkeit zu ermöglichen. Wenn Sie auf dieser Seite weitersurfen stimmen Sie der <a href="/cookies.html">Nutzung von Cookies</a> zu. ').css('color','#fff').appendTo(cookiecontainer);
					var cookiebutton =$('<a class="btn btn-success btn-xs">').html('<i class="glyphicon glyphicon-ok"></i> <strong>Ich stimme zu.</strong>').appendTo(cookiecontainer);
					
					cookiecontainer.hide().prependTo($("nav.navbar")).slideDown();
					
					cookiebutton.on("click", function() {
						Cookies.set('rade-consent', '1', { expires: 365, domain: '.radegundisfest.de', path: '/',secure: true});
						cookiecontainer.slideUp("fast",function() {
							cookiecontainer.remove();
						});
						_paq.push(['trackEvent', 'Cookies', 'Einwilligen', 'Click']);
					});
				}
				_paq.push(['disableCookies']);
			}
			
			// Piwik vorbereiten
			_paq.push(['setDocumentTitle', doctitle]);
			_paq.push(['setCustomUrl', window.location.href]);
			
			// Piwik tracken
			_paq.push(['trackPageView']);

			// Scroll to top of site
			$("html,body").animate({ scrollTop: 0 }, "fast");
			
			// Event triggern, der per "data-exec" spezifiziert wurde
			var exec = targetelement.data("exec");
			if (exec) targetelement.trigger(exec);
			
			// Dummy-Image Data URI
			var dummy400x300 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsAQMAAADXeXeBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCODk1MDFEQUZBMjExMUU0OTBGQ0RBMDY5NUEzMTg0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCODk1MDFEQkZBMjExMUU0OTBGQ0RBMDY5NUEzMTg0OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI4OTUwMUQ4RkEyMTExRTQ5MEZDREEwNjk1QTMxODQ5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI4OTUwMUQ5RkEyMTExRTQ5MEZDREEwNjk1QTMxODQ5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7D2xsQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAlSURBVBgZ7cExAQAAAMIg+6deCU9gAAAAAAAAAAAAAAAAAADAVTvEAAEqyMeEAAAAAElFTkSuQmCC";
			
			// Lazy load images
			// Damit das korrekt funktionniert, muss eine Bildhöhe definiert sein, die durch das Dummy-Bild festgelegt ist
			// Aktiviere LazyLoad nur bei Bildern, die nicht schon geladen sind! (geladen: element hat kein data-src mehr!)
			$("img[data-src]",targetelement).attr("src",dummy400x300).unveil();
		};

		var swformfield = function (options) {
			var div = $('<div class="form-group">');
			var divi = $('<div class="input-group">').appendTo(div);
			
			
			var formfield = $('<'+options.el+'>',{
				type: options.type,
				class: 'form-control',
				name: options.name,
				autocorrect: options.autocor,
				autocapitalize: options.autocap,
				autocomplete: options.autocomp,
				placeholder: options.placeh,
				style: options.style,
				rows: options.rows,
				value: options.value
			});
			
			if ( options.type === 'hidden' ) {
				formfield.removeClass('form-control');
				formfield.appendTo(options.container);
			} else if (options.type === 'checkbox') {
				$("<label>").append(formfield).append($('<span>'+options.text+'</span>')).appendTo(divi);
				div.appendTo(options.container);
			} else {
				$('<span class="input-group-addon">').html(options.text).appendTo(divi);
				formfield.appendTo(divi);
				$('<span class="glyphicon form-control-feedback" aria-hidden="true">').appendTo(divi);
				if (options.extra) options.extra.appendTo(divi);
				div.appendTo(options.container);
			}
			
			return formfield;
		}
	
	$(document).ready(function () {
		
		// event handler für Buttons hinzufügen, die ein href Attribut haben und kein rel=external
		$("body").on("click", "a",function(event) {
			$el = $(event.currentTarget);
			
			if ( $el.attr("href") && $el.attr("rel") !== "external" && $el.attr("href").lastIndexOf("javascript", 0) !== 0) {
				gototarget($el.attr("href"));
				
				// no click event
				event.preventDefault();
			}
		});

		// Karte einmalig anzeigen
		$("button.mapbtn").one("click", function(event) {
			var maps = $("div.maps").removeClass("hidden");
			var mform = $("div.mform").removeClass("hidden");
			var mdirections = $("div.mdirections").removeClass("hidden");
			var location = swformfield({container:mform, el:'input', text: '<span class="glyphicon glyphicon-map-marker"></span>', type: 'text', autocor: 'off', placeh: "Startpunkt hier eingeben und auf <Route suchen> drücken"});
			var search = $('<a class="btn btn-success" type="button" name="search" role="button">').html('Route suchen!').on("click", function() {maps.swgetroute(location.val())});
			var reset = $('<a class="btn btn-warning" type="button" name="reset" role="button">').html('Route zurücksetzen!').on("click", function() {maps.swmaps()});
			$('<div class="btn-group btn-group-justified">').append(search).append(reset).appendTo(mform);
			
			//Show Map
			maps.swmaps();
			
			// Remove Button
			$(event.target).remove();
		});
		
		// Helferliste
		$("div.helferliste").helferliste();

		// Back-Button auf allen anderen Seiten hinzufügen
		var backbtn = $("<div class='row'><div class='col-md-12'><a href='"+getpath()+"'class='btn btn-sm btn-default'>Zurück Zur Übersicht &raquo;</a></div></div>");
		$("article[data-content]:not([data-content=landing])").append(backbtn);
		
		$.fn.swvalid = function(check) {
			$(this).each(function(i,el) {
				if (check) {
					$(el).closest("div.form-group").removeClass("has-error").addClass("has-success").find("span.glyphicon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
				} else {
					$(el).closest("div.form-group").removeClass("has-success").addClass("has-error").find("span.glyphicon").removeClass("glyphicon-ok").addClass("glyphicon-remove");
				}
			});
			return this;
		}
		
		// Exec-Events
		$("article[data-exec=showlogin]").on("showlogin", function() {
			
			$.ajax({type: 'GET', url: '/intern/auth'}).done(function() {
				gototarget("/intern/");
			}).fail(function() {
				var logincontainer = $("<div>");
				var swalert = $('<div class="swalert">').appendTo(logincontainer);
				var form = $('<form class="swform">').appendTo(logincontainer);
				var elogin = swformfield({container:form, el:'input', text: 'Login', type: 'text', name: 'login', autocor: 'off', autocap:'none'});
				var epassword = swformfield({container:form, el:'input', text: 'Passwort', type: 'password', name: 'password', autocomp: 'off'});
				var eemail = swformfield({container:form, el:'input', text: 'Email (optional)', type: 'email', name: 'email'});
				
				var data = {task: 'login'};

				form.on("submit", function(e) {
					e.preventDefault();
					$.extend(data,ar2obj(form.serializeArray()));
					$.ajax({type: 'POST', url: '/intern/auth', data: JSON.stringify(data), contentType: 'application/json', dataType: 'json'}).done(function(d) {
						swalert.empty();
						
						if (d.success) {
							e.dialog.setType(BootstrapDialog.TYPE_SUCCESS);
							elogin.swvalid(true);
							epassword.swvalid(true);
							eemail.swvalid(true);
							setTimeout(function() {gototarget("/intern/")}
							,1000);
						} else {
							e.dialog.setType(BootstrapDialog.TYPE_DANGER).enableButtons(true).getButton('submit').stopSpin();
							$.each([
								{el: elogin, status: d.login, msg: 'Login "'+elogin.val()+'" ungültig!'},
								{el: epassword, status: d.password, msg: 'Passwort ungültig!'},
								{el: eemail, status: d.email, msg: 'Emailadresse "'+eemail.val()+'" ungültig!!'}] ,function (i, obj) {
								if (!obj.status) {
									$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+obj.msg+'</div>').appendTo(swalert);
									obj.el.val("").swvalid(false);
								} else {
									obj.el.swvalid(true);
								}
							});
						}
					}).fail(function() {
						
					});
				});
				
				var dialogref = BootstrapDialog.show({
					title: "Bitte Einloggen!",
					message: logincontainer,
					spinicon: 'glyphicon glyphicon-refresh',
					buttons : [
					{
						id: 'submit',
						label: "Login",
						cssClass: 'btn-primary',
						autospin: true,
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							form.trigger({type:'submit',dialog:dialog});
						}
					},
					{label: 'Schließen!', cssClass: 'btn-default', action: function(dialog) {dialog.close();gototarget();}}
					]
				});
				
				// Dialog schließen bei Back button
				$(window).one("hashchange popstate", function () {
					dialogref.close();
				});
			});
		});

		// Routing beim Laden der Seite
		render();

		// Routing bei hashchange bzw. Seitenwechsel(funktionniert auch bei Back- & Forward-Funktion des Browsers, mit allen Browsern kompatibel)
		$(window).on("hashchange", function (e, data) {
			render();
		});
		
		$(window).on("popstate", function (e, data) {
			if (!ismodern) return false;
			render();
		});
	});

	var ar2obj = function (arr) {
		var obj = {};
		$.each(arr,function(i, el){obj[el.name] = el.value;});
		return obj;
	};

	window.gmapsapi = function(){
		jQuery(window).trigger('gmapsloaded');
	};

	var swmapswrapper = function (callback) {
		if (typeof google === 'object' && typeof google.maps === 'object') {
			callback();
		} else {
			$(window).one("gmapsloaded",callback);

			$.ajax({
				url: 'js/gmap3.min.js',
				dataType: "script",
				cache:true
			}).done(function() {
				$.ajax({
					url: 'https://maps.google.com/maps/api/js?sensor=false&language=de&callback=gmapsapi',
					dataType: "script",
					cache: true
				});
			});
		}
	};

	$.fn.swmaps = function () {
		if (this.length === 0) return;
		var $that = $(this);
		swmapswrapper(function() {
			$("div.mdirections").empty()
			$that.gmap3({clear:["directionsrenderer","polygon","overlay"]});
			$that.gmap3({
				map:{options:{center:[48.249228,10.695875],zoom:16},
					events: {
						zoom_changed: function () {
							if ( $that.gmap3("get").getZoom() < 14 ) {
								$that.gmap3({
								get: {
									name: 'overlay',
									all: true,
									callback: function (ov) {
										$.each(ov,function(i,v){v.hide();});
									}
								}
								})
							} else {
								$that.gmap3({
								get: {
									name: 'overlay',
									all: true,
									callback: function (ov) {
										$.each(ov,function(i,v){v.show();});
									}
								}
								})
							}
						}
					}	
				},
				overlay:{ 
					values: [
						{latLng: [48.24974,10.69707],options:{content:'<span style="color:#00F;font-size:2em">P1</span>',offset:{y:5,x:5}}},
						{latLng: [48.25182,10.69732],options:{content:'<span style="color:#00F;font-size:2em">P2</span>',offset:{y:5,x:5}}},
						{latLng: [48.24786,10.69425],options:{content:'<span style="color:#00F;font-size:2em">P3</span>',offset:{y:5,x:5}}},
						{latLng: [48.2493,10.69667],options:{content:'<span style="color:#F00;font-size:2em">Festzelt</span>',offset:{y:5,x:5}}},
					]
				},
				polygon:{
				values: [
						{options:{
							strokeColor: "#0000FF",strokeOpacity: 0.8,strokeWeight: 2,fillColor: "#00F",fillOpacity: 0.35,
							paths:[
								[48.24986,10.6967],
								[48.24966,10.69656],
								[48.24956,10.69702],
								[48.24974,10.69707],
								[48.2498,10.69701]
								]
							}
						},
						{options:{
							strokeColor: "#0000FF",strokeOpacity: 0.8,strokeWeight: 2,fillColor: "#00F",fillOpacity: 0.35,
							paths:[
								[48.25187,10.69706],
								[48.25188,10.69691],
								[48.25183,10.69687],
								[48.25182,10.69704],
								[48.25162,10.69705],
								[48.25162,10.69706],
								[48.25156,10.69705],
								[48.25155,10.69712],
								[48.25182,10.69732],
								[48.25183,10.69713]
								]
							}
						},
						{options:{
							strokeColor: "#0000FF",strokeOpacity: 0.8,strokeWeight: 2,fillColor: "#00F",fillOpacity: 0.35,
							paths:[
								[48.24838,10.69372],
								[48.24834,10.69367],
								[48.24802,10.69394],
								[48.24797,10.69393],
								[48.24794,10.69387],
								[48.24793,10.69373],
								[48.24787,10.69373],
								[48.24789,10.69395],
								[48.24786,10.69425],
								[48.2479,10.69427],
								[48.24795,10.69406]
								]
							}
						},
						{options:{
							strokeColor: "#F00",strokeOpacity: 0.8,strokeWeight: 2,fillColor: "#F00",fillOpacity: 0.35,
							paths:[
								[48.24962,10.69656],
								[48.24932,10.69645],
								[48.2493,10.69667],
								[48.2496,10.69677]
								]
							}
						}
					]
				}
			});
		});
	};
	
	$.fn.swgetroute = function(origin) {
		if (this.length === 0) return;
		var $that = $(this);
		swmapswrapper(function() {
			$that.gmap3({clear:"directionsrenderer"});
			$that.gmap3({
				getroute:{
					options:{
						origin:origin,
						destination:{latLng: [48.2493,10.69667]},
						travelMode: google.maps.DirectionsTravelMode.DRIVING
					},
					callback: function(results){
					var directioncontainer = $("div.mdirections").empty();
					if (!results) {
						$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Ort "'+origin+'" nicht gefunden!</div>').appendTo($("div.mform").find("div.swalert").empty());
						return
					};
					$("div.mform").find("div.swalert").empty();
					$that.gmap3({
						directionsrenderer:{
						container: directioncontainer,
						options:{directions:results} 
						}
					});
					}
				}
			});
		});
	}

	$.fn.helferliste = function(view) {
		if (this.length === 0) return;
		
		view = view || 'default';
		// Scroll-Position speichern, um sie nach dem Rendern wiederherzustellen
		var lastposition = $(window).scrollTop();
		
		var parentcontainer = $(this).empty();
		
		var row = $("<div class='row'>").appendTo(parentcontainer);
		
		var topcontainer = $("<div class='col-md-12'>").appendTo(row).css("margin-bottom","20px");
		
		var listcontainer = $("<div class='col-md-12'>").appendTo(row).css("margin-bottom","20px");
		
		var bottomcontainer = $("<div class='col-md-12'>").appendTo(row);
		
		$.getJSON("/intern/helferliste",function(d) {
			var auth = d.auth;
			var email = d.email;
			var shifts = d.shifts;
			var authname = d.authname;
				if ($.isEmptyObject( shifts ) ) shifts = []; //TMPFIX for lua cjson bug
			var helpers = d.helpers;
				if ($.isEmptyObject( helpers ) ) helpers = []; //TMPFIX for lua cjson bug
			var inquiries = d.inquiries;
				if ($.isEmptyObject( inquiries ) ) inquiries = []; //TMPFIX for lua cjson bug
				
			var shiftsavailable = shifts.filter(function(k){
				var sh = helpers.filter(function(j){return j.shiftid === k.shiftid});
				return k.number > sh.length
			});
			
			var neededhelpers = 0;
			
			$.each(shifts,function(i,s) {
				neededhelpers += s.number;
			});
			
			var aquiredhelpers = helpers.length;
			
			var progresscontainer = $("<div class='progress'>").appendTo(topcontainer);
			
			var progresspercentage = aquiredhelpers / neededhelpers * 100;
			
			var progressclass = function (v) {
				if (v === 100) {
					return "progress-bar-success";
				} else if (v > 90) {
					return "progress-bar-info";
				} else if (v > 70) {
					return "progress-bar-warning";
				} else {
					return "progress-bar-danger";
				}
			}

			var progressbar = $("<div class='progress-bar "+progressclass(progresspercentage)+" progress-bar-striped' role='progressbar' style='width: 0%;'>"+aquiredhelpers+" von "+neededhelpers+" Jobs vergeben!</div>").appendTo(progresscontainer).animate({width:progresspercentage+"%"},{duration: 100,easing: "linear"});
			
			if (auth === 4) {
				var menubuttongroup = $("<div class='btn-group btn-group-justified'>").appendTo(topcontainer).css("margin-bottom","20px");
				
				$("<a type='button' class='btn btn-default'>Helferliste</a>").appendTo(menubuttongroup).on("click", function() {parentcontainer.helferliste();});
				$("<a type='button' class='btn btn-default'>Helferbelegung</a>").appendTo(menubuttongroup).on("click", function() {parentcontainer.helferliste("lazyasses");});
			}
			
			var rendershift2 = function (shiftid,options) {
				//currentshift
				var cs;
				if (typeof shiftid === 'object' && shiftid.shiftid) {
					cs = shiftid;
				} else {
					shiftid = parseInt(shiftid);
					cs = (shifts.filter(function(k){return k.shiftid === shiftid}))[0];
				}
				options = options || {};
				
				if (cs.name) {
					var html = cs.name+" (";
					if (options.shrt) {
						html += moment.unix(cs.timestart).format("dddd, D.")
					} else {
						if (cs.timestart === cs.timeend) html += moment.unix(cs.timestart).format("dddd, D. MMMM")+" ab "+moment.unix(cs.timestart).format("HH:mm")+" Uhr";
						if (cs.timestart !== cs.timeend) html += moment.unix(cs.timestart).format("dddd, D. MMMM")+" von "+moment.unix(cs.timestart).format("HH:mm")+" bis "+moment.unix(cs.timeend).format("HH:mm")+" Uhr";
					}
					html += ")";
					return html;
				} else {
					return "Shift not found";
				}
			}
			
			var swdeleteany = function (options) {
				BootstrapDialog.show({
					title: options.title,
					message: options.msg,
					spinicon: 'glyphicon glyphicon-refresh',
					buttons : [
					{
						label: options.btnmsg,
						cssClass: 'btn-danger',
						autospin: true,
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							
							$.ajax({type: 'POST', url: options.url || '/intern/helferliste', data: JSON.stringify(options.data), contentType: 'application/json'}).success(function() {
								dialog.enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
									dialog.close(); 
									if ( typeof(options.view) === 'function' ) {
										options.view.call();
									} else {
										parentcontainer.helferliste(options.view);
									}
								}}]).updateButtons().setMessage(options.successmsg);
								if (options.el) options.el.slideUp("slow",function(){$(this).remove()});
							});
						}
					},
					{label: 'Schließen!', cssClass: 'btn-default', action: function(dialog) {dialog.close()}}
					]
				});
			}
			
			var shiftinsert = function(ins) {
				var shiftcontainer = $("<div>");
				var swalert = $('<div class="swalert">').appendTo(shiftcontainer);
				var form = $('<form class="swform">').appendTo(shiftcontainer);
				var data = {task:"shiftinsert"};
				
				var llll = "ddd D. MMM YYYY HH:mm";
				var defaults = {
					stepping: 5,
					locale: moment.locale('de'),
					useStrict: false,  
					format: llll,
					sideBySide: false
				};
				
				var shifttitle = swformfield({container:form, el:'input', text: 'Schichtbezeichnung', type: 'text', name: 'name', placeh: 'Kloputzen'});
				var elstart = swformfield({container:form, el:'input', text: 'Von', type: 'text', name: 'timestart', autocompl: 'off'}).datetimepicker(defaults);
				var extra = $('<span class="input-group-addon"><label><input type="checkbox" name="noend" value=1><span>Offenes Ende</span></label></span>');
				var elnoend = extra.find("input");
				var elend = swformfield({container:form, el:'input', text: 'Bis', type: 'text', name: 'timeend', autocompl: 'off', extra: extra }).datetimepicker(defaults);
				var eldescription = swformfield({container:form, el:'input', text: 'Bemerkung', type: 'text', name: 'description'});
				var elnumber = swformfield({container:form, el:'input', text: 'Anzahl Personen', type: 'number', name: 'number'});
				var elshiftid = swformfield({container:form, el:'input', type: 'hidden', name: 'shiftid'}).attr("disabled","disabled");
				
				elnoend.on("change", function (e) {
					if ($(this).is(":checked")) {
						elend.attr("disabled","disabled");
					} else {
						elend.removeAttr("disabled");
					}
				});

				if (ins.data) {
					shifttitle.val(ins.data.name);
					elstart.data("DateTimePicker").date(moment.unix(ins.data.timestart));
					elend.data("DateTimePicker").date(moment.unix(ins.data.timeend));
					elnumber.val(ins.data.number);
					eldescription.val(ins.data.description);
					if (ins.data.timestart === ins.data.timeend) {
						elnoend.prop("checked",true);
					} else {
						elnoend.prop("checked",false);
					}
					elnoend.trigger("change");
					elshiftid.removeAttr("disabled").val(ins.data.shiftid);
					data.task = "shiftedit";
				}
				
				form.on("submit", function(e) {
					e.preventDefault();
					$.extend(data,ar2obj(form.serializeArray()));
					if (data.timestart) data.timestart = moment(data.timestart,llll).unix();
					if (data.timeend) data.timeend = moment(data.timeend,llll).unix();
					$.ajax({type: 'POST', url: '/intern/helferliste', data: JSON.stringify(data), contentType: 'application/json', dataType: 'json'}).done(function(d) {
						swalert.empty();
						if (d.success) {
							e.dialog.setType(BootstrapDialog.TYPE_SUCCESS).enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
								dialog.close();
								parentcontainer.helferliste();
							}}]).updateButtons().setMessage(ins.success);
						} else {
							e.dialog.setType(BootstrapDialog.TYPE_DANGER).enableButtons(true).getButton('submit').stopSpin();
							$.each([
								{el: shifttitle, status: d.name, msg: 'Schichtname "'+shifttitle.val()+'" ungültig!'},
								{el: elstart, status: d.timestart, msg: 'Startzeit ungültig!'},
								{el: elnumber, status: d.number, msg: 'Anzahl der Personen ungültig!'},
								{el: elend, status: d.timeend, msg: 'Endzeit ungültig!'}] ,function (i, obj) {
								if (!obj.status) {
									$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+obj.msg+'</div>').appendTo(swalert);
									obj.el.val("").swvalid(false);
								} else {
									obj.el.swvalid(true);
								}
							});
						}
					});
				});
				
				BootstrapDialog.show({
					title: ins.title,
					message: shiftcontainer,
					buttons : [{
						id: 'submit',
						label: ins.label,
						cssClass: 'btn-primary',
						autospin: true,
						spinicon: 'glyphicon glyphicon-refresh',
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							form.trigger({type:'submit',dialog:dialog});
						}
					}]
				});
			};
			
			var helperinsert = function(ins) {
				var helpercontainer = $("<div>");
				var swalert = $('<div class="swalert">').appendTo(helpercontainer);
				var form = $('<form class="swform">').appendTo(helpercontainer);
				var data = {task:"helperpropose"};
				
				var helpername = swformfield({container:form, el:'input', text: 'Helfername', type: 'text', name: 'name', placeh: 'Vorname Nachname'});
				var elemail = swformfield({container:form, el:'input', text: 'Email', type: 'email', name: 'email'});
				var eldummyshift = swformfield({container:form, el:'input', text: 'Schicht', type: 'text', name: 'dummy'}).attr("disabled","disabled");
				var eldescription = swformfield({container:form, el:'input', text: 'Bemerkung', type: 'text', name: 'description'});
				var elsendmail = swformfield({container:form, el:'input', text: 'Email Senden?', type: 'checkbox', name: 'sendmail'});
				var elsendmailtext = swformfield({container:form, el:'textarea', text: 'Mailtext', name: 'sendmailtext', style: 'width:100%;resize:vertical;', rows: 9});
				var elshiftid = swformfield({container:form, el:'input', type: 'hidden', name: 'shiftid'});
				var elhelid = swformfield({container:form, el:'input', type: 'hidden', name: 'helid'}).attr("disabled","disabled");
				var elinqid = swformfield({container:form, el:'input', type: 'hidden', name: 'inqid'}).attr("disabled","disabled");
				
				elsendmail.on("change",function(){
					if ($(this).prop("checked")) {
						elsendmailtext.removeAttr("disabled").closest("div.form-group").show();
						elsendmailtext.text("Hallo "+helpername.val()+",\n\ndu wurdest beim Radegundisfest für folgende Schicht eingeteilt:\n\n"+(eldummyshift.val() || $("option:selected",elshiftid).text())+"\n\nEs grüßt das Organisationsteam!");
					} else {
						elsendmailtext.attr("disabled","disabled").closest("div.form-group").hide();
					};
				}).trigger("change");

				if(ins.shiftid) {
					eldummyshift.val(rendershift2(ins.shiftid));
					elshiftid.val(ins.shiftid);
				}

				elsendmail.closest("div.form-group").hide();

				if ( auth === 4 ) {
					data.task = "helperinsert";
					elsendmail.removeAttr("disabled").closest("div.form-group").show();
				}

				if (email) elemail.val(email);

				if (ins.data) {
					helpername.val(ins.data.name);
					elemail.val(ins.data.email);
					eldescription.val(ins.data.description);
					elshiftid.val(ins.data.shiftid);
					eldummyshift.val(rendershift2(ins.data.shiftid));
					if (ins.data.helid) {
						elhelid.removeAttr("disabled").val(ins.data.helid);
						data.task = "helperedit";
					} else if (ins.data.inqid) {
						elinqid.removeAttr("disabled").val(ins.data.inqid);
						data.task = "helperinqinsert";
						if (ins.shiftselectable) {
							elshiftid.remove();
							var shiftselect = $("<select name='shiftid' class='form-control'>");
							$.each(shiftsavailable, function(i,s) {
								$("<option>").val(s.shiftid).text(rendershift2(s)).appendTo(shiftselect);
							});
							eldummyshift.replaceWith(shiftselect);
							eldummyshift = shiftselect;
						}
					}
				}

				form.on("submit", function(e) {
					e.preventDefault();
					$.extend(data,ar2obj(form.serializeArray()));
					$.ajax({type: 'POST', url: '/intern/helferliste', data: JSON.stringify(data), contentType: 'application/json', dataType: 'json'}).done(function(d) {
						swalert.empty();
						if (d.success) {
							e.dialog.setType(BootstrapDialog.TYPE_SUCCESS).enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
								dialog.close();
								parentcontainer.helferliste();
							}}]).updateButtons().setMessage(ins.success);
						} else {
							e.dialog.setType(BootstrapDialog.TYPE_DANGER).enableButtons(true).getButton('submit').stopSpin();
							$.each([
								{el: helpername, status: d.name, msg: 'Name "'+helpername.val()+'" ungültig!'},
								{el: elemail, status: d.email, msg: 'Emailadresse "'+elemail.val()+'" ungültig!!'}] ,function (i, obj) {
								if (!obj.status) {
									$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+obj.msg+'</div>').appendTo(swalert);
									obj.el.val("").swvalid(false);
								} else {
									obj.el.swvalid(true);
								}
							});
						}
					});
				});

				BootstrapDialog.show({
					title: ins.title,
					message: helpercontainer,
					buttons : [{
						id: 'submit',
						label: ins.label,
						cssClass: 'btn-primary',
						autospin: true,
						spinicon: 'glyphicon glyphicon-refresh',
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							form.trigger({type:'submit',dialog:dialog});
						}
					}]
				});
			};
			
			var peopleinsert = function(ins) {
				var container = $("<div>");
				var data = {task:"peopleinsert"};
				var swalert = $('<div class="swalert">').appendTo(container);
				var form = $('<form class="swform">').appendTo(container);
				
				var elname = swformfield({container:form, el:'input', text: 'Nachname', type: 'text', name: 'name', placeh: 'Mustermann'});
				var elvorname = swformfield({container:form, el:'input', text: 'Vorname', type: 'text', name: 'vorname', placeh: 'Mustermann'});
				
				form.on("submit", function(e) {
					e.preventDefault();
					$.extend(data,ar2obj(form.serializeArray()));
					$.ajax({type: 'POST', url: '/intern/helferliste', data: JSON.stringify(data), contentType: 'application/json', dataType: 'json'}).done(function(d) {
						swalert.empty();
						if (d.success) {
							e.dialog.setType(BootstrapDialog.TYPE_SUCCESS).enableButtons(true).setButtons([{label:'OK',cssClass: 'btn-success',action: function(dialog) {
								dialog.close();
								parentcontainer.helferliste("lazyasses");
							}}]).updateButtons().setMessage(ins.success);
						} else {
							e.dialog.setType(BootstrapDialog.TYPE_DANGER).enableButtons(true).getButton('submit').stopSpin();
							$.each([
								{el: elname, status: d.name, msg: 'Nachname "'+elname.val()+'" ungültig!'},
								{el: elvorname, status: d.vorname, msg: 'Vorname "'+elvorname.val()+'" ungültig!'}
								] ,function (i, obj) {
								if (!obj.status) {
									$('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+obj.msg+'</div>').appendTo(swalert);
									obj.el.val("").swvalid(false);
								} else {
									obj.el.swvalid(true);
								}
							});
						}
					});
				});
				
				BootstrapDialog.show({
					title: ins.title,
					message: container,
					buttons : [{
						id: 'submit',
						label: ins.label,
						cssClass: 'btn-primary',
						autospin: true,
						spinicon: 'glyphicon glyphicon-refresh',
						action: function(dialog) {
							dialog.enableButtons(false).setClosable(false);
							form.trigger({type:'submit',dialog:dialog});
						}
					}]
				});
			};
			
			var renderinquiries = function (el,shiftinquiries,shiftselectable) {
				$.each(shiftinquiries, function(m, mtem) {
					var inq = $("<li><a style='cursor:pointer'>"+mtem.name+" ("+moment.unix(mtem.timestamp).format("D.MMM HH:mm")+") </a></li>").appendTo($(el));

					inq.on("click", function() {
						helperinsert({data:mtem, shiftselectable: ( shiftselectable || false ), title: 'Helfer hinzufügen', label: 'Helfer hinzufügen!', success: 'Neuer Helfer erfolgreich hinzugefügt!'});
					});

					$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(inq.find("a")).on("click", function(event) {
						event.stopPropagation();
						var data = {task:"helperinqdelete",inqid:mtem.inqid};
						swdeleteany({data: data,title:'Bestätigung',msg:'Helfervorschlag wirklich löschen?',btnmsg:'Vorschlag löschen!', successmsg: "Vorschlag gelöscht!",el: inq, view: ""});
					});
				});
			}
			
			////MAIN
			
			if (view === 'default') {
			
				//Render List
				$.each(shifts, function (i,item) {
					var panel = $('<div class="panel panel-default">');
					var panel_h = $('<div class="panel-heading">').appendTo(panel).html("<h4>"+rendershift2(item)+"</h4");
					if (item.description) {
						$("<span class='label label-default'>Bemerkung: "+item.description+"</span>").appendTo(panel_h);
					}
					var panel_b = $('<div class="panel-body">').appendTo(panel);
					var table = $("<table class='table table-striped'>").appendTo(panel_b);
	
					var shifthelpers = helpers.filter(function(k){return k.shiftid === item.shiftid});
					var shiftinquiries = inquiries.filter(function(k){return k.shiftid === item.shiftid});
	
					$.each(shifthelpers, function(j,jtem) {
						var tr = $("<tr>").appendTo(table);
						$("<td><b>"+(j+1)+".</b></td>").appendTo(tr);
						$("<td>"+jtem.name+"</td>").appendTo(tr);
						$("<td>"+jtem.description+"</td>").appendTo(tr);
						var td = $("<td>").appendTo(tr);
						if (auth === 4) {
							var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(td);
							$("<button class='btn btn-xs btn-warning'><i class='glyphicon glyphicon-pencil'></i></button>").appendTo(buttongroup).on("click", function() {
								helperinsert({data:jtem, title: 'Helfer bearbeiten', label: 'Helfer bearbeiten!', success: 'Helfer erfolgreich bearbeiten!'});
							});
							$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(buttongroup).on("click", function() {
								var data = {task:"helperdelete",helid:jtem.helid};
								swdeleteany({data: data,title:'Bestätigung',msg:'Helfer wirklich löschen?',btnmsg:'Helfer löschen!', successmsg: "Helfer gelöscht!",el: tr, view: ""});
							});
						}
					});
					
					for (var k = shifthelpers.length; k < item.number; k++) {
						(function() { // Anonymous function for Closures!
							var tr = $("<tr>").appendTo(table);
							$("<td><b>"+(k+1)+".</b></td>").appendTo(tr);
							$("<td><span class='hidden-print'>" + "UNBESETZT" + "</span></td>").appendTo(tr);
							$("<td>"+""+"</td>").appendTo(tr);
							var td = $("<td>").appendTo(tr);
							
							if (auth === 4) {
								var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(td);
								$("<button class='btn btn-xs btn-success'><i class='glyphicon glyphicon-plus'></i></button>").appendTo(buttongroup).on("click", function() {
									helperinsert({shiftid:item.shiftid,title: 'Helfer hinzufügen', label: 'Helfer hinzufügen!', success: 'Neuer Helfer erfolgreich hinzugefügt!'});
								});
	
								if (shiftinquiries.length > 0) {
									$("<button type='button' class='btn btn-xs btn-success dropdown-toggle' data-toggle='dropdown'><i class='glyphicon glyphicon-exclamation-sign'></i> ("+shiftinquiries.length+") Anfragen</button>").appendTo(buttongroup);
									var dropdown = $("<ul class='dropdown-menu'></ul>").appendTo(buttongroup);
									renderinquiries(dropdown,shiftinquiries);
								}
							} else if (auth === 1) {
								if (shiftinquiries.length > 0) {
									$("<span class='label label-danger pull-right'>Nur eine Anfrage pro Schicht!</span>").appendTo(td)
								} else {
									$("<button class='btn btn-xs btn-success pull-right'><i class='glyphicon glyphicon-plus'></i> Anfragen!</button>").appendTo(td).on("click", function() {
										helperinsert({shiftid:item.shiftid, title: 'Mich als Helfer vorschlagen', label: 'Mich vorschlagen!', success: 'Vorschlag erfolgreich übermittelt!'});
									});
								}
							};
						})();
					};
	
					if (auth === 4) {
						//Vorschläge anzeigen, wenn Schicht voll ist!
						if (shifthelpers.length >= item.number && shiftinquiries.length > 0) {
							var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(panel_b);
							$("<button type='button' class='btn btn-xs btn-success dropdown-toggle' data-toggle='dropdown'><i class='glyphicon glyphicon-exclamation-sign'></i> ("+shiftinquiries.length+") Anfragen</button>").appendTo(buttongroup);
							var dropdown = $("<ul class='dropdown-menu'></ul>").appendTo(buttongroup);
							renderinquiries(dropdown,shiftinquiries,true);
						}
						
						var buttongroup = $("<div class='btn-group pull-right' role='group'>").appendTo(panel_h.find("h4"));
						// Change-button
						$("<button class='btn btn-xs btn-warning'><i class='glyphicon glyphicon-pencil'></i></button>").appendTo(buttongroup).on("click", function() {
							shiftinsert({data:item, title: 'Schicht bearbeiten', label: 'Schicht bearbeiten!', success: 'Schicht erfolgreich bearbeitet!'});
						});
						//Delete-button
						$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(buttongroup).on('click', function() {
							var data = {task:"shiftdelete",shiftid:item.shiftid};
							swdeleteany({data: data,title:'Bestätigung',msg:'Schicht (und alle Helfer dieser Schicht) wirklich löschen?',btnmsg:'Schicht löschen!', successmsg: 'Schicht gelöscht!',el: panel, view: ""});
						});
					}
					panel.appendTo(listcontainer);
				});
				
				if (auth === 4) {
					$('<button class="btn btn-primary">Neue Schicht</button>').appendTo(topcontainer).on("click",function() {
						shiftinsert({title: 'Schicht hinzufügen', label: 'Schicht hinzufügen!', success: 'Neue Schicht erfolgreich hinzugefügt!'});
					});
				}
				
				//Alte Position nach neu Redern wiederherstellen
				$(window).scrollTop(lastposition);
				
			} else if (view === 'lazyasses') {
				var rendershiftslist = function(l) {
					if ( l === null ) return "x";
					var ids = l.split(",");
					var wrap = $("<span>");
					$.each(ids,function(i,id) {
						$("<span class='label label-primary'>").append(rendershift2(id,{shrt:true})).appendTo(wrap);
						if (i !== ids.length ) wrap.append("<br />");
					});
					return wrap;
				}
				
				//Belegung
				var table = $("<table class='table table-striped'>").appendTo(listcontainer);
					$("<caption>Belegung</caption>").appendTo(table);
				var thead = $("<thead>").appendTo(table);
				var tbody = $("<tbody>").appendTo(table);
				var tr_head = $("<tr>").appendTo(thead);
				$.each(['Name','Samstag','Sonntag','Montag','Löschen'], function (i,la) { $("<td><b>"+la+"</b></td>").appendTo(tr_head)});
				$.each(d.lazyasses, function(i,la) {
					var tr = $("<tr>").appendTo(tbody);
					$("<td><b>"+la.name+"</b></td>").appendTo(tr);
					$.each([la.sat_shiftids,la.sun_shiftids,la.mon_shiftids],function(i,laa) {$("<td>").append(rendershiftslist(laa)).appendTo(tr)});
					var td = $("<td>").appendTo(tr);
					$("<button class='btn btn-xs btn-danger'><i class='glyphicon glyphicon-remove'></i></button>").appendTo(td).on('click', function() {
						var data = {task:"peopledel",peopleid:la.id};
						swdeleteany({data: data,title:'Person löschen',msg:'Person aus der Verzeichnisliste wirklich löschen?',btnmsg:'Person löschen!', successmsg: "Person gelöscht!",el: tr, view: "lazyasses"});
					});
				});
				
				//Fehlende Zuordnung
				var table = $("<table class='table table-striped'>").appendTo(listcontainer);
					$("<caption>Fehlende Zuordnung</caption>").appendTo(table);
				var thead = $("<thead>").appendTo(table);
				var tbody = $("<tbody>").appendTo(table);
				var tr_head = $("<tr>").appendTo(thead);
					$("<td><b>Name</b></td>").appendTo(tr_head);
					$("<td><b>Schicht</b></td>").appendTo(tr_head);
				$.each(d.notassigned, function(i,la) {
					var tr = $("<tr>").appendTo(tbody);
					$("<td><b>"+la.name+"</b></td>").appendTo(tr);
					$("<td>" + rendershift2(la.shiftid) + "</td>").appendTo(tr);
				});
				
				//Leute hinzufügen
				$("<button class='btn btn-primary'>Zuordnung hinzufügen!</button>").appendTo(listcontainer).on("click", function() {
					peopleinsert({title: 'Personen zum Verzeichnis hinzufügen', label: 'Person hinzufügen!', success: 'Neue Person erfolgreich hinzugefügt!'});
				});
			}
			
			$("<p>Eingeloggt als: <span class='badge'>"+authname+"</span></p>").appendTo(bottomcontainer);
			$('<p><button class="btn btn-danger btn-xs">Ausloggen</button></p>').appendTo(bottomcontainer).find("button").on("click",function() {
				var data = {task:"logout"};
				swdeleteany({data: data,title:'Bestätigung',msg:'Wirklich ausloggen?',btnmsg:'Ausloggen!', successmsg: "Erfolgreich ausgeloggt!", view: function() {gototarget("/login.html"), url: "/intern/auth"}});
			});
		});
		return this;
	};
});

/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this;

    images.one("unveil", function() {
        var source = this.getAttribute(attrib);
        source = source || this.getAttribute("data-src");
        if (source) {
          this.setAttribute("src", source);
		  // Wichtig, mit das Bild beim erneuten Seitenbesucht nicht nochmals ersetzt wird!
          this.removeAttribute("data-src");
          if (typeof callback === "function") callback.call(this);
        }
    });
	
	// "unveil" events der Bilder bei Seitenwechsel wieder entfernen
	$w.one("hashchange", function() {
		images.off("unveil")
	});

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this),
            wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();
        return eb >= wt - th && et <= wb + th;
      });

      inview.trigger("unveil");
      images = images.not(inview);
    }
	// alte Window "unveil" events löschen und neue Events aktivieren
	var uevents = "scroll.unveil resize.unveil lookup.unveil"
	$w.off(uevents).on(uevents, unveil);
    unveil();
    return this;
  };

})(window.jQuery);