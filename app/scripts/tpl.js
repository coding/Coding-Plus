'use strict';
/* global CodingAPI, Handlebars*/

(function (window, API, Handlebars) {

	var TPL_CACHES = {};

	var getTpl = function (id, html){
		var tpl = TPL_CACHES[id] || html;
		if(!TPL_CACHES[id]){
			TPL_CACHES[id] = Handlebars.compile(tpl);
		}
		return TPL_CACHES[id];
	};

	var get = function (id, params) {
		var tpl = getTpl(id, params.$$HTML);
		return tpl(params);
	};

	var TPL = {
		get: get
	};

	window.TPL = TPL;

})(window, CodingAPI, Handlebars);