var core = (function($, window, document) {
	"use strict";

	var coreStatus = function() {
		console.log("Running Smoothly!");
	};

	var getBreakpoint = function() {
		var w = $(window).width();

		if (w <= core.breakpoints.mobile) {
			return "mobile";
		}
		if (w <= core.breakpoints.tablet) {
			return "tablet";
		} else {
			return "desktop";
		}
	};

	var onResize = function(options) {
		var options = $.extend(
			{},
			{
				callback: function() {},
				interval: 500,
			},
			options || {}
		);

		var resizeTimer;
		var oldWidth = 0;
		$(window).resize(function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				var newWidth = $(window).width();
				if (newWidth !== oldWidth) {
					oldWidth = newWidth;
					options.callback();
				}
			}, options.interval);
		});
	};

	return {
		init: function() {
			coreStatus();
		},

		load: function(module) {
			$(document).ready(function() {
				module.init();
			});
		},

		onResize: function(options) {
			return onResize(options);
		},

		getBreakpoint: function() {
			return getBreakpoint();
		},

		breakpoints: {
			desktop: 1025,
			tablet: 1024,
			mobile: 767,
		},
	};
})(jQuery, window, document);
core.load(core);
