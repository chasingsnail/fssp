/*! jQuery UI - v1.12.1 - 2018-01-29
* http://jqueryui.com
* Includes:  form-reset-mixin.js, keycode.js, labels.js, unique-id.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		
		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {
		
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
	
	$.ui = $.ui || {};
	
	var version = $.ui.version = "1.12.1";


// Support: IE8 Only
// IE8 does not support the form attribute and when it is supplied. It overwrites the form prop
// with a string, so we need to find the proper form.
	var form = $.fn.form = function() {
		return typeof this[ 0 ].form === "string" ? this.closest( "form" ) : $( this[ 0 ].form );
	};
	
	
	/*!
	 * jQuery UI Form Reset Mixin 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: Form Reset Mixin
//>>group: Core
//>>description: Refresh input widgets when their form is reset
//>>docs: http://api.jqueryui.com/form-reset-mixin/
	
	
	
	var formResetMixin = $.ui.formResetMixin = {
		_formResetHandler: function() {
			var form = $( this );
			
			// Wait for the form reset to actually happen before refreshing
			setTimeout( function() {
				var instances = form.data( "ui-form-reset-instances" );
				$.each( instances, function() {
					this.refresh();
				} );
			} );
		},
		
		_bindFormResetHandler: function() {
			this.form = this.element.form();
			if ( !this.form.length ) {
				return;
			}
			
			var instances = this.form.data( "ui-form-reset-instances" ) || [];
			if ( !instances.length ) {
				
				// We don't use _on() here because we use a single event handler per form
				this.form.on( "reset.ui-form-reset", this._formResetHandler );
			}
			instances.push( this );
			this.form.data( "ui-form-reset-instances", instances );
		},
		
		_unbindFormResetHandler: function() {
			if ( !this.form.length ) {
				return;
			}
			
			var instances = this.form.data( "ui-form-reset-instances" );
			instances.splice( $.inArray( this, instances ), 1 );
			if ( instances.length ) {
				this.form.data( "ui-form-reset-instances", instances );
			} else {
				this.form
					.removeData( "ui-form-reset-instances" )
					.off( "reset.ui-form-reset" );
			}
		}
	};
	
	
	/*!
	 * jQuery UI Keycode 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: Keycode
//>>group: Core
//>>description: Provide keycodes as keynames
//>>docs: http://api.jqueryui.com/jQuery.ui.keyCode/
	
	
	var keycode = $.ui.keyCode = {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	};




// Internal use only
	var escapeSelector = $.ui.escapeSelector = ( function() {
		var selectorEscape = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
		return function( selector ) {
			return selector.replace( selectorEscape, "\\$1" );
		};
	} )();
	
	
	/*!
	 * jQuery UI Labels 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: labels
//>>group: Core
//>>description: Find all the labels associated with a given input
//>>docs: http://api.jqueryui.com/labels/
	
	
	
	var labels = $.fn.labels = function() {
		var ancestor, selector, id, labels, ancestors;
		
		// Check control.labels first
		if ( this[ 0 ].labels && this[ 0 ].labels.length ) {
			return this.pushStack( this[ 0 ].labels );
		}
		
		// Support: IE <= 11, FF <= 37, Android <= 2.3 only
		// Above browsers do not support control.labels. Everything below is to support them
		// as well as document fragments. control.labels does not work on document fragments
		labels = this.eq( 0 ).parents( "label" );
		
		// Look for the label based on the id
		id = this.attr( "id" );
		if ( id ) {
			
			// We don't search against the document in case the element
			// is disconnected from the DOM
			ancestor = this.eq( 0 ).parents().last();
			
			// Get a full set of top level ancestors
			ancestors = ancestor.add( ancestor.length ? ancestor.siblings() : this.siblings() );
			
			// Create a selector for the label based on the id
			selector = "label[for='" + $.ui.escapeSelector( id ) + "']";
			
			labels = labels.add( ancestors.find( selector ).addBack( selector ) );
			
		}
		
		// Return whatever we have found for labels
		return this.pushStack( labels );
	};
	
	
	/*!
	 * jQuery UI Unique ID 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: uniqueId
//>>group: Core
//>>description: Functions to generate and remove uniqueId's
//>>docs: http://api.jqueryui.com/uniqueId/
	
	
	
	var uniqueId = $.fn.extend( {
		uniqueId: ( function() {
			var uuid = 0;
			
			return function() {
				return this.each( function() {
					if ( !this.id ) {
						this.id = "ui-id-" + ( ++uuid );
					}
				} );
			};
		} )(),
		
		removeUniqueId: function() {
			return this.each( function() {
				if ( /^ui-id-\d+$/.test( this.id ) ) {
					$( this ).removeAttr( "id" );
				}
			} );
		}
	} );
	
	
	/*!
	 * jQuery UI Controlgroup 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: Controlgroup
//>>group: Widgets
//>>description: Visually groups form control widgets
//>>docs: http://api.jqueryui.com/controlgroup/
//>>demos: http://jqueryui.com/controlgroup/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/controlgroup.css
//>>css.theme: ../../themes/base/theme.css
	
	
	var controlgroupCornerRegex = /ui-corner-([a-z]){2,6}/g;
	
	var widgetsControlgroup = $.widget( "ui.controlgroup", {
		version: "1.12.1",
		defaultElement: "<div>",
		options: {
			direction: "horizontal",
			disabled: null,
			onlyVisible: true,
			items: {
				"button": "input[type=button], input[type=submit], input[type=reset], button, a",
				"controlgroupLabel": ".ui-controlgroup-label",
				"checkboxradio": "input[type='checkbox'], input[type='radio']",
				"selectmenu": "select",
				"spinner": ".ui-spinner-input"
			}
		},
		
		_create: function() {
			this._enhance();
		},
		
		// To support the enhanced option in jQuery Mobile, we isolate DOM manipulation
		_enhance: function() {
			this.element.attr( "role", "toolbar" );
			this.refresh();
		},
		
		_destroy: function() {
			this._callChildMethod( "destroy" );
			this.childWidgets.removeData( "ui-controlgroup-data" );
			this.element.removeAttr( "role" );
			if ( this.options.items.controlgroupLabel ) {
				this.element
					.find( this.options.items.controlgroupLabel )
					.find( ".ui-controlgroup-label-contents" )
					.contents().unwrap();
			}
		},
		
		_initWidgets: function() {
			var that = this,
				childWidgets = [];
			
			// First we iterate over each of the items options
			$.each( this.options.items, function( widget, selector ) {
				var labels;
				var options = {};
				
				// Make sure the widget has a selector set
				if ( !selector ) {
					return;
				}
				
				if ( widget === "controlgroupLabel" ) {
					labels = that.element.find( selector );
					labels.each( function() {
						var element = $( this );
						
						if ( element.children( ".ui-controlgroup-label-contents" ).length ) {
							return;
						}
						element.contents()
							.wrapAll( "<span class='ui-controlgroup-label-contents'></span>" );
					} );
					that._addClass( labels, null, "ui-widget ui-widget-content ui-state-default" );
					childWidgets = childWidgets.concat( labels.get() );
					return;
				}
				
				// Make sure the widget actually exists
				if ( !$.fn[ widget ] ) {
					return;
				}
				
				// We assume everything is in the middle to start because we can't determine
				// first / last elements until all enhancments are done.
				if ( that[ "_" + widget + "Options" ] ) {
					options = that[ "_" + widget + "Options" ]( "middle" );
				} else {
					options = { classes: {} };
				}
				
				// Find instances of this widget inside controlgroup and init them
				that.element
					.find( selector )
					.each( function() {
						var element = $( this );
						var instance = element[ widget ]( "instance" );
						
						// We need to clone the default options for this type of widget to avoid
						// polluting the variable options which has a wider scope than a single widget.
						var instanceOptions = $.widget.extend( {}, options );
						
						// If the button is the child of a spinner ignore it
						// TODO: Find a more generic solution
						if ( widget === "button" && element.parent( ".ui-spinner" ).length ) {
							return;
						}
						
						// Create the widget if it doesn't exist
						if ( !instance ) {
							instance = element[ widget ]()[ widget ]( "instance" );
						}
						if ( instance ) {
							instanceOptions.classes =
								that._resolveClassesValues( instanceOptions.classes, instance );
						}
						element[ widget ]( instanceOptions );
						
						// Store an instance of the controlgroup to be able to reference
						// from the outermost element for changing options and refresh
						var widgetElement = element[ widget ]( "widget" );
						$.data( widgetElement[ 0 ], "ui-controlgroup-data",
							instance ? instance : element[ widget ]( "instance" ) );
						
						childWidgets.push( widgetElement[ 0 ] );
					} );
			} );
			
			this.childWidgets = $( $.unique( childWidgets ) );
			this._addClass( this.childWidgets, "ui-controlgroup-item" );
		},
		
		_callChildMethod: function( method ) {
			this.childWidgets.each( function() {
				var element = $( this ),
					data = element.data( "ui-controlgroup-data" );
				if ( data && data[ method ] ) {
					data[ method ]();
				}
			} );
		},
		
		_updateCornerClass: function( element, position ) {
			var remove = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all";
			var add = this._buildSimpleOptions( position, "label" ).classes.label;
			
			this._removeClass( element, null, remove );
			this._addClass( element, null, add );
		},
		
		_buildSimpleOptions: function( position, key ) {
			var direction = this.options.direction === "vertical";
			var result = {
				classes: {}
			};
			result.classes[ key ] = {
				"middle": "",
				"first": "ui-corner-" + ( direction ? "top" : "left" ),
				"last": "ui-corner-" + ( direction ? "bottom" : "right" ),
				"only": "ui-corner-all"
			}[ position ];
			
			return result;
		},
		
		_spinnerOptions: function( position ) {
			var options = this._buildSimpleOptions( position, "ui-spinner" );
			
			options.classes[ "ui-spinner-up" ] = "";
			options.classes[ "ui-spinner-down" ] = "";
			
			return options;
		},
		
		_buttonOptions: function( position ) {
			return this._buildSimpleOptions( position, "ui-button" );
		},
		
		_checkboxradioOptions: function( position ) {
			return this._buildSimpleOptions( position, "ui-checkboxradio-label" );
		},
		
		_selectmenuOptions: function( position ) {
			var direction = this.options.direction === "vertical";
			return {
				width: direction ? "auto" : false,
				classes: {
					middle: {
						"ui-selectmenu-button-open": "",
						"ui-selectmenu-button-closed": ""
					},
					first: {
						"ui-selectmenu-button-open": "ui-corner-" + ( direction ? "top" : "tl" ),
						"ui-selectmenu-button-closed": "ui-corner-" + ( direction ? "top" : "left" )
					},
					last: {
						"ui-selectmenu-button-open": direction ? "" : "ui-corner-tr",
						"ui-selectmenu-button-closed": "ui-corner-" + ( direction ? "bottom" : "right" )
					},
					only: {
						"ui-selectmenu-button-open": "ui-corner-top",
						"ui-selectmenu-button-closed": "ui-corner-all"
					}
					
				}[ position ]
			};
		},
		
		_resolveClassesValues: function( classes, instance ) {
			var result = {};
			$.each( classes, function( key ) {
				var current = instance.options.classes[ key ] || "";
				current = $.trim( current.replace( controlgroupCornerRegex, "" ) );
				result[ key ] = ( current + " " + classes[ key ] ).replace( /\s+/g, " " );
			} );
			return result;
		},
		
		_setOption: function( key, value ) {
			if ( key === "direction" ) {
				this._removeClass( "ui-controlgroup-" + this.options.direction );
			}
			
			this._super( key, value );
			if ( key === "disabled" ) {
				this._callChildMethod( value ? "disable" : "enable" );
				return;
			}
			
			this.refresh();
		},
		
		refresh: function() {
			var children,
				that = this;
			
			this._addClass( "ui-controlgroup ui-controlgroup-" + this.options.direction );
			
			if ( this.options.direction === "horizontal" ) {
				this._addClass( null, "ui-helper-clearfix" );
			}
			this._initWidgets();
			
			children = this.childWidgets;
			
			// We filter here because we need to track all childWidgets not just the visible ones
			if ( this.options.onlyVisible ) {
				children = children.filter( ":visible" );
			}
			
			if ( children.length ) {
				
				// We do this last because we need to make sure all enhancment is done
				// before determining first and last
				$.each( [ "first", "last" ], function( index, value ) {
					var instance = children[ value ]().data( "ui-controlgroup-data" );
					
					if ( instance && that[ "_" + instance.widgetName + "Options" ] ) {
						var options = that[ "_" + instance.widgetName + "Options" ](
							children.length === 1 ? "only" : value
						);
						options.classes = that._resolveClassesValues( options.classes, instance );
						instance.element[ instance.widgetName ]( options );
					} else {
						that._updateCornerClass( children[ value ](), value );
					}
				} );
				
				// Finally call the refresh method on each of the child widgets.
				this._callChildMethod( "refresh" );
			}
		}
	} );
	
	/*!
	 * jQuery UI Checkboxradio 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: Checkboxradio
//>>group: Widgets
//>>description: Enhances a form with multiple themeable checkboxes or radio buttons.
//>>docs: http://api.jqueryui.com/checkboxradio/
//>>demos: http://jqueryui.com/checkboxradio/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.structure: ../../themes/base/checkboxradio.css
//>>css.theme: ../../themes/base/theme.css
	
	
	
	$.widget( "ui.checkboxradio", [ $.ui.formResetMixin, {
		version: "1.12.1",
		options: {
			disabled: null,
			label: null,
			icon: true,
			classes: {
				"ui-checkboxradio-label": "ui-corner-all",
				"ui-checkboxradio-icon": "ui-corner-all"
			}
		},
		
		_getCreateOptions: function() {
			var disabled, labels;
			var that = this;
			var options = this._super() || {};
			
			// We read the type here, because it makes more sense to throw a element type error first,
			// rather then the error for lack of a label. Often if its the wrong type, it
			// won't have a label (e.g. calling on a div, btn, etc)
			this._readType();
			
			labels = this.element.labels();
			
			// If there are multiple labels, use the last one
			this.label = $( labels[ labels.length - 1 ] );
			if ( !this.label.length ) {
				$.error( "No label found for checkboxradio widget" );
			}
			
			this.originalLabel = "";
			
			// We need to get the label text but this may also need to make sure it does not contain the
			// input itself.
			this.label.contents().not( this.element[ 0 ] ).each( function() {
				
				// The label contents could be text, html, or a mix. We concat each element to get a
				// string representation of the label, without the input as part of it.
				that.originalLabel += this.nodeType === 3 ? $( this ).text() : this.outerHTML;
			} );
			
			// Set the label option if we found label text
			if ( this.originalLabel ) {
				options.label = this.originalLabel;
			}
			
			disabled = this.element[ 0 ].disabled;
			if ( disabled != null ) {
				options.disabled = disabled;
			}
			return options;
		},
		
		_create: function() {
			var checked = this.element[ 0 ].checked;
			
			this._bindFormResetHandler();
			
			if ( this.options.disabled == null ) {
				this.options.disabled = this.element[ 0 ].disabled;
			}
			
			this._setOption( "disabled", this.options.disabled );
			this._addClass( "ui-checkboxradio", "ui-helper-hidden-accessible" );
			this._addClass( this.label, "ui-checkboxradio-label", "ui-button ui-widget" );
			
			if ( this.type === "radio" ) {
				this._addClass( this.label, "ui-checkboxradio-radio-label" );
			}
			
			if ( this.options.label && this.options.label !== this.originalLabel ) {
				this._updateLabel();
			} else if ( this.originalLabel ) {
				this.options.label = this.originalLabel;
			}
			
			this._enhance();
			
			if ( checked ) {
				this._addClass( this.label, "ui-checkboxradio-checked", "ui-state-active" );
				if ( this.icon ) {
					this._addClass( this.icon, null, "ui-state-hover" );
				}
			}
			
			this._on( {
				change: "_toggleClasses",
				focus: function() {
					this._addClass( this.label, null, "ui-state-focus ui-visual-focus" );
				},
				blur: function() {
					this._removeClass( this.label, null, "ui-state-focus ui-visual-focus" );
				}
			} );
		},
		
		_readType: function() {
			var nodeName = this.element[ 0 ].nodeName.toLowerCase();
			this.type = this.element[ 0 ].type;
			if ( nodeName !== "input" || !/radio|checkbox/.test( this.type ) ) {
				$.error( "Can't create checkboxradio on element.nodeName=" + nodeName +
					" and element.type=" + this.type );
			}
		},
		
		// Support jQuery Mobile enhanced option
		_enhance: function() {
			this._updateIcon( this.element[ 0 ].checked );
		},
		
		widget: function() {
			return this.label;
		},
		
		_getRadioGroup: function() {
			var group;
			var name = this.element[ 0 ].name;
			var nameSelector = "input[name='" + $.ui.escapeSelector( name ) + "']";
			
			if ( !name ) {
				return $( [] );
			}
			
			if ( this.form.length ) {
				group = $( this.form[ 0 ].elements ).filter( nameSelector );
			} else {
				
				// Not inside a form, check all inputs that also are not inside a form
				group = $( nameSelector ).filter( function() {
					return $( this ).form().length === 0;
				} );
			}
			
			return group.not( this.element );
		},
		
		_toggleClasses: function() {
			var checked = this.element[ 0 ].checked;
			this._toggleClass( this.label, "ui-checkboxradio-checked", "ui-state-active", checked );
			
			if ( this.options.icon && this.type === "checkbox" ) {
				this._toggleClass( this.icon, null, "ui-icon-check ui-state-checked", checked )
					._toggleClass( this.icon, null, "ui-icon-blank", !checked );
			}
			
			if ( this.type === "radio" ) {
				this._getRadioGroup()
					.each( function() {
						var instance = $( this ).checkboxradio( "instance" );
						
						if ( instance ) {
							instance._removeClass( instance.label,
								"ui-checkboxradio-checked", "ui-state-active" );
						}
					} );
			}
		},
		
		_destroy: function() {
			this._unbindFormResetHandler();
			
			if ( this.icon ) {
				this.icon.remove();
				this.iconSpace.remove();
			}
		},
		
		_setOption: function( key, value ) {
			
			// We don't allow the value to be set to nothing
			if ( key === "label" && !value ) {
				return;
			}
			
			this._super( key, value );
			
			if ( key === "disabled" ) {
				this._toggleClass( this.label, null, "ui-state-disabled", value );
				this.element[ 0 ].disabled = value;
				
				// Don't refresh when setting disabled
				return;
			}
			this.refresh();
		},
		
		_updateIcon: function( checked ) {
			var toAdd = "ui-icon ui-icon-background ";
			
			if ( this.options.icon ) {
				if ( !this.icon ) {
					this.icon = $( "<span>" );
					this.iconSpace = $( "<span> </span>" );
					this._addClass( this.iconSpace, "ui-checkboxradio-icon-space" );
				}
				
				if ( this.type === "checkbox" ) {
					toAdd += checked ? "ui-icon-check ui-state-checked" : "ui-icon-blank";
					this._removeClass( this.icon, null, checked ? "ui-icon-blank" : "ui-icon-check" );
				} else {
					toAdd += "ui-icon-blank";
				}
				this._addClass( this.icon, "ui-checkboxradio-icon", toAdd );
				if ( !checked ) {
					this._removeClass( this.icon, null, "ui-icon-check ui-state-checked" );
				}
				this.icon.prependTo( this.label ).after( this.iconSpace );
			} else if ( this.icon !== undefined ) {
				this.icon.remove();
				this.iconSpace.remove();
				delete this.icon;
			}
		},
		
		_updateLabel: function() {
			
			// Remove the contents of the label ( minus the icon, icon space, and input )
			var contents = this.label.contents().not( this.element[ 0 ] );
			if ( this.icon ) {
				contents = contents.not( this.icon[ 0 ] );
			}
			if ( this.iconSpace ) {
				contents = contents.not( this.iconSpace[ 0 ] );
			}
			contents.remove();
			
			this.label.append( this.options.label );
		},
		
		refresh: function() {
			var checked = this.element[ 0 ].checked,
				isDisabled = this.element[ 0 ].disabled;
			
			this._updateIcon( checked );
			this._toggleClass( this.label, "ui-checkboxradio-checked", "ui-state-active", checked );
			if ( this.options.label !== null ) {
				this._updateLabel();
			}
			
			if ( isDisabled !== this.options.disabled ) {
				this._setOptions( { "disabled": isDisabled } );
			}
		}
		
	} ] );
	
	var widgetsCheckboxradio = $.ui.checkboxradio;
	
	
	/*!
	 * jQuery UI Button 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: Button
//>>group: Widgets
//>>description: Enhances a form with themeable buttons.
//>>docs: http://api.jqueryui.com/button/
//>>demos: http://jqueryui.com/button/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.theme: ../../themes/base/theme.css
	
	
	
	$.widget( "ui.button", {
		version: "1.12.1",
		defaultElement: "<button>",
		options: {
			classes: {
				"ui-button": "ui-corner-all"
			},
			disabled: null,
			icon: null,
			iconPosition: "beginning",
			label: null,
			showLabel: true
		},
		
		_getCreateOptions: function() {
			var disabled,
				
				// This is to support cases like in jQuery Mobile where the base widget does have
				// an implementation of _getCreateOptions
				options = this._super() || {};
			
			this.isInput = this.element.is( "input" );
			
			disabled = this.element[ 0 ].disabled;
			if ( disabled != null ) {
				options.disabled = disabled;
			}
			
			this.originalLabel = this.isInput ? this.element.val() : this.element.html();
			if ( this.originalLabel ) {
				options.label = this.originalLabel;
			}
			
			return options;
		},
		
		_create: function() {
			if ( !this.option.showLabel & !this.options.icon ) {
				this.options.showLabel = true;
			}
			
			// We have to check the option again here even though we did in _getCreateOptions,
			// because null may have been passed on init which would override what was set in
			// _getCreateOptions
			if ( this.options.disabled == null ) {
				this.options.disabled = this.element[ 0 ].disabled || false;
			}
			
			this.hasTitle = !!this.element.attr( "title" );
			
			// Check to see if the label needs to be set or if its already correct
			if ( this.options.label && this.options.label !== this.originalLabel ) {
				if ( this.isInput ) {
					this.element.val( this.options.label );
				} else {
					this.element.html( this.options.label );
				}
			}
			this._addClass( "ui-button", "ui-widget" );
			this._setOption( "disabled", this.options.disabled );
			this._enhance();
			
			if ( this.element.is( "a" ) ) {
				this._on( {
					"keyup": function( event ) {
						if ( event.keyCode === $.ui.keyCode.SPACE ) {
							event.preventDefault();
							
							// Support: PhantomJS <= 1.9, IE 8 Only
							// If a native click is available use it so we actually cause navigation
							// otherwise just trigger a click event
							if ( this.element[ 0 ].click ) {
								this.element[ 0 ].click();
							} else {
								this.element.trigger( "click" );
							}
						}
					}
				} );
			}
		},
		
		_enhance: function() {
			if ( !this.element.is( "button" ) ) {
				this.element.attr( "role", "button" );
			}
			
			if ( this.options.icon ) {
				this._updateIcon( "icon", this.options.icon );
				this._updateTooltip();
			}
		},
		
		_updateTooltip: function() {
			this.title = this.element.attr( "title" );
			
			if ( !this.options.showLabel && !this.title ) {
				this.element.attr( "title", this.options.label );
			}
		},
		
		_updateIcon: function( option, value ) {
			var icon = option !== "iconPosition",
				position = icon ? this.options.iconPosition : value,
				displayBlock = position === "top" || position === "bottom";
			
			// Create icon
			if ( !this.icon ) {
				this.icon = $( "<span>" );
				
				this._addClass( this.icon, "ui-button-icon", "ui-icon" );
				
				if ( !this.options.showLabel ) {
					this._addClass( "ui-button-icon-only" );
				}
			} else if ( icon ) {
				
				// If we are updating the icon remove the old icon class
				this._removeClass( this.icon, null, this.options.icon );
			}
			
			// If we are updating the icon add the new icon class
			if ( icon ) {
				this._addClass( this.icon, null, value );
			}
			
			this._attachIcon( position );
			
			// If the icon is on top or bottom we need to add the ui-widget-icon-block class and remove
			// the iconSpace if there is one.
			if ( displayBlock ) {
				this._addClass( this.icon, null, "ui-widget-icon-block" );
				if ( this.iconSpace ) {
					this.iconSpace.remove();
				}
			} else {
				
				// Position is beginning or end so remove the ui-widget-icon-block class and add the
				// space if it does not exist
				if ( !this.iconSpace ) {
					this.iconSpace = $( "<span> </span>" );
					this._addClass( this.iconSpace, "ui-button-icon-space" );
				}
				this._removeClass( this.icon, null, "ui-wiget-icon-block" );
				this._attachIconSpace( position );
			}
		},
		
		_destroy: function() {
			this.element.removeAttr( "role" );
			
			if ( this.icon ) {
				this.icon.remove();
			}
			if ( this.iconSpace ) {
				this.iconSpace.remove();
			}
			if ( !this.hasTitle ) {
				this.element.removeAttr( "title" );
			}
		},
		
		_attachIconSpace: function( iconPosition ) {
			this.icon[ /^(?:end|bottom)/.test( iconPosition ) ? "before" : "after" ]( this.iconSpace );
		},
		
		_attachIcon: function( iconPosition ) {
			this.element[ /^(?:end|bottom)/.test( iconPosition ) ? "append" : "prepend" ]( this.icon );
		},
		
		_setOptions: function( options ) {
			var newShowLabel = options.showLabel === undefined ?
				this.options.showLabel :
				options.showLabel,
				newIcon = options.icon === undefined ? this.options.icon : options.icon;
			
			if ( !newShowLabel && !newIcon ) {
				options.showLabel = true;
			}
			this._super( options );
		},
		
		_setOption: function( key, value ) {
			if ( key === "icon" ) {
				if ( value ) {
					this._updateIcon( key, value );
				} else if ( this.icon ) {
					this.icon.remove();
					if ( this.iconSpace ) {
						this.iconSpace.remove();
					}
				}
			}
			
			if ( key === "iconPosition" ) {
				this._updateIcon( key, value );
			}
			
			// Make sure we can't end up with a button that has neither text nor icon
			if ( key === "showLabel" ) {
				this._toggleClass( "ui-button-icon-only", null, !value );
				this._updateTooltip();
			}
			
			if ( key === "label" ) {
				if ( this.isInput ) {
					this.element.val( value );
				} else {
					
					// If there is an icon, append it, else nothing then append the value
					// this avoids removal of the icon when setting label text
					this.element.html( value );
					if ( this.icon ) {
						this._attachIcon( this.options.iconPosition );
						this._attachIconSpace( this.options.iconPosition );
					}
				}
			}
			
			this._super( key, value );
			
			if ( key === "disabled" ) {
				this._toggleClass( null, "ui-state-disabled", value );
				this.element[ 0 ].disabled = value;
				if ( value ) {
					this.element.blur();
				}
			}
		},
		
		refresh: function() {
			
			// Make sure to only check disabled if its an element that supports this otherwise
			// check for the disabled class to determine state
			var isDisabled = this.element.is( "input, button" ) ?
				this.element[ 0 ].disabled : this.element.hasClass( "ui-button-disabled" );
			
			if ( isDisabled !== this.options.disabled ) {
				this._setOptions( { disabled: isDisabled } );
			}
			
			this._updateTooltip();
		}
	} );

// DEPRECATED
	if ( $.uiBackCompat !== false ) {
		
		// Text and Icons options
		$.widget( "ui.button", $.ui.button, {
			options: {
				text: true,
				icons: {
					primary: null,
					secondary: null
				}
			},
			
			_create: function() {
				if ( this.options.showLabel && !this.options.text ) {
					this.options.showLabel = this.options.text;
				}
				if ( !this.options.showLabel && this.options.text ) {
					this.options.text = this.options.showLabel;
				}
				if ( !this.options.icon && ( this.options.icons.primary ||
						this.options.icons.secondary ) ) {
					if ( this.options.icons.primary ) {
						this.options.icon = this.options.icons.primary;
					} else {
						this.options.icon = this.options.icons.secondary;
						this.options.iconPosition = "end";
					}
				} else if ( this.options.icon ) {
					this.options.icons.primary = this.options.icon;
				}
				this._super();
			},
			
			_setOption: function( key, value ) {
				if ( key === "text" ) {
					this._super( "showLabel", value );
					return;
				}
				if ( key === "showLabel" ) {
					this.options.text = value;
				}
				if ( key === "icon" ) {
					this.options.icons.primary = value;
				}
				if ( key === "icons" ) {
					if ( value.primary ) {
						this._super( "icon", value.primary );
						this._super( "iconPosition", "beginning" );
					} else if ( value.secondary ) {
						this._super( "icon", value.secondary );
						this._super( "iconPosition", "end" );
					}
				}
				this._superApply( arguments );
			}
		} );
		
		$.fn.button = ( function( orig ) {
			return function() {
				if ( !this.length || ( this.length && this[ 0 ].tagName !== "INPUT" ) ||
					( this.length && this[ 0 ].tagName === "INPUT" && (
						this.attr( "type" ) !== "checkbox" && this.attr( "type" ) !== "radio"
					) ) ) {
					return orig.apply( this, arguments );
				}
				if ( !$.ui.checkboxradio ) {
					$.error( "Checkboxradio widget missing" );
				}
				if ( arguments.length === 0 ) {
					return this.checkboxradio( {
						"icon": false
					} );
				}
				return this.checkboxradio.apply( this, arguments );
			};
		} )( $.fn.button );
		
		$.fn.buttonset = function() {
			if ( !$.ui.controlgroup ) {
				$.error( "Controlgroup widget missing" );
			}
			if ( arguments[ 0 ] === "option" && arguments[ 1 ] === "items" && arguments[ 2 ] ) {
				return this.controlgroup.apply( this,
					[ arguments[ 0 ], "items.button", arguments[ 2 ] ] );
			}
			if ( arguments[ 0 ] === "option" && arguments[ 1 ] === "items" ) {
				return this.controlgroup.apply( this, [ arguments[ 0 ], "items.button" ] );
			}
			if ( typeof arguments[ 0 ] === "object" && arguments[ 0 ].items ) {
				arguments[ 0 ].items = {
					button: arguments[ 0 ].items
				};
			}
			return this.controlgroup.apply( this, arguments );
		};
	}
	
	var widgetsButton = $.ui.button;
	
	
	/*!
	 * jQuery UI Tooltip 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */

//>>label: Tooltip
//>>group: Widgets
//>>description: Shows additional information for any element on hover or focus.
//>>docs: http://api.jqueryui.com/tooltip/
//>>demos: http://jqueryui.com/tooltip/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/tooltip.css
//>>css.theme: ../../themes/base/theme.css
	
	
	
	$.widget( "ui.tooltipgrid", {
		version: "1.12.1",
		options: {
			classes: {
				"ui-tooltip": "ui-corner-all ui-widget-shadow"
			},
			content: function() {
				
				// support: IE<9, Opera in jQuery <1.7
				// .text() can't accept undefined, so coerce to a string
				var title = $( this ).attr( "title" ) || "";
				
				// Escape title, since we're going from an attribute to raw HTML
				return $( "<a>" ).text( title ).html();
			},
			hide: true,
			
			// Disabled elements have inconsistent behavior across browsers (#8661)
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: true,
			track: false,
			
			// Callbacks
			close: null,
			open: null
		},
		
		_addDescribedBy: function( elem, id ) {
			var describedby = ( elem.attr( "aria-describedby" ) || "" ).split( /\s+/ );
			describedby.push( id );
			elem
				.data( "ui-tooltip-id", id )
				.attr( "aria-describedby", $.trim( describedby.join( " " ) ) );
		},
		
		_removeDescribedBy: function( elem ) {
			var id = elem.data( "ui-tooltip-id" ),
				describedby = ( elem.attr( "aria-describedby" ) || "" ).split( /\s+/ ),
				index = $.inArray( id, describedby );
			
			if ( index !== -1 ) {
				describedby.splice( index, 1 );
			}
			
			elem.removeData( "ui-tooltip-id" );
			describedby = $.trim( describedby.join( " " ) );
			if ( describedby ) {
				elem.attr( "aria-describedby", describedby );
			} else {
				elem.removeAttr( "aria-describedby" );
			}
		},
		
		_create: function() {
			this._on( {
				mouseover: "open",
				focusin: "open"
			} );
			
			// IDs of generated tooltips, needed for destroy
			this.tooltips = {};
			
			// IDs of parent tooltips where we removed the title attribute
			this.parents = {};
			
			// Append the aria-live region so tooltips announce correctly
			this.liveRegion = $( "<div>" )
				.attr( {
					role: "log",
					"aria-live": "assertive",
					"aria-relevant": "additions"
				} )
				.appendTo( this.document[ 0 ].body );
			this._addClass( this.liveRegion, null, "ui-helper-hidden-accessible" );
			
			this.disabledTitles = $( [] );
		},
		
		_setOption: function( key, value ) {
			var that = this;
			
			this._super( key, value );
			
			if ( key === "content" ) {
				$.each( this.tooltips, function( id, tooltipData ) {
					that._updateContent( tooltipData.element );
				} );
			}
		},
		
		_setOptionDisabled: function( value ) {
			this[ value ? "_disable" : "_enable" ]();
		},
		
		_disable: function() {
			var that = this;
			
			// Close open tooltips
			$.each( this.tooltips, function( id, tooltipData ) {
				var event = $.Event( "blur" );
				event.target = event.currentTarget = tooltipData.element[ 0 ];
				that.close( event, true );
			} );
			
			// Remove title attributes to prevent native tooltips
			this.disabledTitles = this.disabledTitles.add(
				this.element.find( this.options.items ).addBack()
					.filter( function() {
						var element = $( this );
						if ( element.is( "[title]" ) ) {
							return element
								.data( "ui-tooltip-title", element.attr( "title" ) )
								.removeAttr( "title" );
						}
					} )
			);
		},
		
		_enable: function() {
			
			// restore title attributes
			this.disabledTitles.each( function() {
				var element = $( this );
				if ( element.data( "ui-tooltip-title" ) ) {
					element.attr( "title", element.data( "ui-tooltip-title" ) );
				}
			} );
			this.disabledTitles = $( [] );
		},
		
		open: function( event ) {
			var that = this,
				target = $( event ? event.target : this.element )
				
				// we need closest here due to mouseover bubbling,
				// but always pointing at the same event target
					.closest( this.options.items );
			
			// No element to show a tooltip for or the tooltip is already open
			if ( !target.length || target.data( "ui-tooltip-id" ) ) {
				return;
			}
			
			if ( target.attr( "title" ) ) {
				target.data( "ui-tooltip-title", target.attr( "title" ) );
			}
			
			target.data( "ui-tooltip-open", true );
			
			// Kill parent tooltips, custom or native, for hover
			if ( event && event.type === "mouseover" ) {
				target.parents().each( function() {
					var parent = $( this ),
						blurEvent;
					if ( parent.data( "ui-tooltip-open" ) ) {
						blurEvent = $.Event( "blur" );
						blurEvent.target = blurEvent.currentTarget = this;
						that.close( blurEvent, true );
					}
					if ( parent.attr( "title" ) ) {
						parent.uniqueId();
						that.parents[ this.id ] = {
							element: this,
							title: parent.attr( "title" )
						};
						parent.attr( "title", "" );
					}
				} );
			}
			
			this._registerCloseHandlers( event, target );
			this._updateContent( target, event );
		},
		
		_updateContent: function( target, event ) {
			var content,
				contentOption = this.options.content,
				that = this,
				eventType = event ? event.type : null;
			
			if ( typeof contentOption === "string" || contentOption.nodeType ||
				contentOption.jquery ) {
				return this._open( event, target, contentOption );
			}
			
			content = contentOption.call( target[ 0 ], function( response ) {
				
				// IE may instantly serve a cached response for ajax requests
				// delay this call to _open so the other call to _open runs first
				that._delay( function() {
					
					// Ignore async response if tooltip was closed already
					if ( !target.data( "ui-tooltip-open" ) ) {
						return;
					}
					
					// JQuery creates a special event for focusin when it doesn't
					// exist natively. To improve performance, the native event
					// object is reused and the type is changed. Therefore, we can't
					// rely on the type being correct after the event finished
					// bubbling, so we set it back to the previous value. (#8740)
					if ( event ) {
						event.type = eventType;
					}
					this._open( event, target, response );
				} );
			} );
			if ( content ) {
				this._open( event, target, content );
			}
		},
		
		_open: function( event, target, content ) {
			var tooltipData, tooltip, delayedShow, a11yContent,
				positionOption = $.extend( {}, this.options.position );
			
			if ( !content ) {
				return;
			}
			
			// Content can be updated multiple times. If the tooltip already
			// exists, then just update the content and bail.
			tooltipData = this._find( target );
			if ( tooltipData ) {
				tooltipData.tooltip.find( ".ui-tooltip-content" ).html( content );
				return;
			}
			
			// If we have a title, clear it to prevent the native tooltip
			// we have to check first to avoid defining a title if none exists
			// (we don't want to cause an element to start matching [title])
			//
			// We use removeAttr only for key events, to allow IE to export the correct
			// accessible attributes. For mouse events, set to empty string to avoid
			// native tooltip showing up (happens only when removing inside mouseover).
			if ( target.is( "[title]" ) ) {
				if ( event && event.type === "mouseover" ) {
					target.attr( "title", "" );
				} else {
					target.removeAttr( "title" );
				}
			}
			
			tooltipData = this._tooltip( target );
			tooltip = tooltipData.tooltip;
			this._addDescribedBy( target, tooltip.attr( "id" ) );
			tooltip.find( ".ui-tooltip-content" ).html( content );
			
			// Support: Voiceover on OS X, JAWS on IE <= 9
			// JAWS announces deletions even when aria-relevant="additions"
			// Voiceover will sometimes re-read the entire log region's contents from the beginning
			this.liveRegion.children().hide();
			a11yContent = $( "<div>" ).html( tooltip.find( ".ui-tooltip-content" ).html() );
			a11yContent.removeAttr( "name" ).find( "[name]" ).removeAttr( "name" );
			a11yContent.removeAttr( "id" ).find( "[id]" ).removeAttr( "id" );
			a11yContent.appendTo( this.liveRegion );
			
			function position( event ) {
				positionOption.of = event;
				if ( tooltip.is( ":hidden" ) ) {
					return;
				}
				tooltip.position( positionOption );
			}
			if ( this.options.track && event && /^mouse/.test( event.type ) ) {
				this._on( this.document, {
					mousemove: position
				} );
				
				// trigger once to override element-relative positioning
				position( event );
			} else {
				tooltip.position( $.extend( {
					of: target
				}, this.options.position ) );
			}
			
			tooltip.hide();
			
			this._show( tooltip, this.options.show );
			
			// Handle tracking tooltips that are shown with a delay (#8644). As soon
			// as the tooltip is visible, position the tooltip using the most recent
			// event.
			// Adds the check to add the timers only when both delay and track options are set (#14682)
			if ( this.options.track && this.options.show && this.options.show.delay ) {
				delayedShow = this.delayedShow = setInterval( function() {
					if ( tooltip.is( ":visible" ) ) {
						position( positionOption.of );
						clearInterval( delayedShow );
					}
				}, $.fx.interval );
			}
			
			this._trigger( "open", event, { tooltip: tooltip } );
		},
		
		_registerCloseHandlers: function( event, target ) {
			var events = {
				keyup: function( event ) {
					if ( event.keyCode === $.ui.keyCode.ESCAPE ) {
						var fakeEvent = $.Event( event );
						fakeEvent.currentTarget = target[ 0 ];
						this.close( fakeEvent, true );
					}
				}
			};
			
			// Only bind remove handler for delegated targets. Non-delegated
			// tooltips will handle this in destroy.
			if ( target[ 0 ] !== this.element[ 0 ] ) {
				events.remove = function() {
					this._removeTooltip( this._find( target ).tooltip );
				};
			}
			
			if ( !event || event.type === "mouseover" ) {
				events.mouseleave = "close";
			}
			if ( !event || event.type === "focusin" ) {
				events.focusout = "close";
			}
			this._on( true, target, events );
		},
		
		close: function( event ) {
			var tooltip,
				that = this,
				target = $( event ? event.currentTarget : this.element ),
				tooltipData = this._find( target );
			
			// The tooltip may already be closed
			if ( !tooltipData ) {
				
				// We set ui-tooltip-open immediately upon open (in open()), but only set the
				// additional data once there's actually content to show (in _open()). So even if the
				// tooltip doesn't have full data, we always remove ui-tooltip-open in case we're in
				// the period between open() and _open().
				target.removeData( "ui-tooltip-open" );
				return;
			}
			
			tooltip = tooltipData.tooltip;
			
			// Disabling closes the tooltip, so we need to track when we're closing
			// to avoid an infinite loop in case the tooltip becomes disabled on close
			if ( tooltipData.closing ) {
				return;
			}
			
			// Clear the interval for delayed tracking tooltips
			clearInterval( this.delayedShow );
			
			// Only set title if we had one before (see comment in _open())
			// If the title attribute has changed since open(), don't restore
			if ( target.data( "ui-tooltip-title" ) && !target.attr( "title" ) ) {
				target.attr( "title", target.data( "ui-tooltip-title" ) );
			}
			
			this._removeDescribedBy( target );
			
			tooltipData.hiding = true;
			tooltip.stop( true );
			this._hide( tooltip, this.options.hide, function() {
				that._removeTooltip( $( this ) );
			} );
			
			target.removeData( "ui-tooltip-open" );
			this._off( target, "mouseleave focusout keyup" );
			
			// Remove 'remove' binding only on delegated targets
			if ( target[ 0 ] !== this.element[ 0 ] ) {
				this._off( target, "remove" );
			}
			this._off( this.document, "mousemove" );
			
			if ( event && event.type === "mouseleave" ) {
				$.each( this.parents, function( id, parent ) {
					$( parent.element ).attr( "title", parent.title );
					delete that.parents[ id ];
				} );
			}
			
			tooltipData.closing = true;
			this._trigger( "close", event, { tooltip: tooltip } );
			if ( !tooltipData.hiding ) {
				tooltipData.closing = false;
			}
		},
		
		_tooltip: function( element ) {
			var tooltip = $( "<div>" ).attr( "role", "tooltip" ),
				content = $( "<div>" ).appendTo( tooltip ),
				id = tooltip.uniqueId().attr( "id" );
			
			this._addClass( content, "ui-tooltip-content" );
			this._addClass( tooltip, "ui-tooltip", "ui-widget ui-widget-content" );
			
			tooltip.appendTo( this._appendTo( element ) );
			
			return this.tooltips[ id ] = {
				element: element,
				tooltip: tooltip
			};
		},
		
		_find: function( target ) {
			var id = target.data( "ui-tooltip-id" );
			return id ? this.tooltips[ id ] : null;
		},
		
		_removeTooltip: function( tooltip ) {
			tooltip.remove();
			delete this.tooltips[ tooltip.attr( "id" ) ];
		},
		
		_appendTo: function( target ) {
			var element = target.closest( ".ui-front, dialog" );
			
			if ( !element.length ) {
				element = this.document[ 0 ].body;
			}
			
			return element;
		},
		
		_destroy: function() {
			var that = this;
			
			// Close open tooltips
			$.each( this.tooltips, function( id, tooltipData ) {
				
				// Delegate to close method to handle common cleanup
				var event = $.Event( "blur" ),
					element = tooltipData.element;
				event.target = event.currentTarget = element[ 0 ];
				that.close( event, true );
				
				// Remove immediately; destroying an open tooltip doesn't use the
				// hide animation
				$( "#" + id ).remove();
				
				// Restore the title
				if ( element.data( "ui-tooltip-title" ) ) {
					
					// If the title attribute has changed since open(), don't restore
					if ( !element.attr( "title" ) ) {
						element.attr( "title", element.data( "ui-tooltip-title" ) );
					}
					element.removeData( "ui-tooltip-title" );
				}
			} );
			this.liveRegion.remove();
		}
	} );

// DEPRECATED
// TODO: Switch return back to widget declaration at top of file when this is removed
	if ( $.uiBackCompat !== false ) {
		
		// Backcompat for tooltipClass option
		$.widget( "ui.tooltipgrid", $.ui.tooltipgrid, {
			options: {
				tooltipClass: null
			},
			_tooltip: function() {
				var tooltipData = this._superApply( arguments );
				if ( this.options.tooltipClass ) {
					tooltipData.tooltip.addClass( this.options.tooltipClass );
				}
				return tooltipData;
			}
		} );
	}
	
	var widgetsTooltip = $.ui.tooltipgrid;
	
	
	
	
}));