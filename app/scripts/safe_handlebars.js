'use strict';

/* global CodingAPI, Zepto, thumbnail */

(function (window, API, $, thumbnail) {

	var iframe = null,
		callbacks = {},
		HTML_CACHES = {};


	function init() {
		iframe = document.getElementById('tpl_sandbox');
		window.addEventListener('message', function (event) {
			var data = event.data;
			if (!data) {
				return;
			}
			var id = data.id;
			var html = data.html;
			var callback = callbacks[id];
			if (callback) {
				callback(html, id);
			}
		});
	}

	function getHtml(id) {
		var url = ['tpl/', id, '.html'].join('');
		var html = HTML_CACHES[id] || API.get(url);
		if (html) {
			HTML_CACHES[id] = html;
		}
		return html;
	}

	var prependHost = function (params) {
        if(!params) {
            return {};
        }
		$.each(params, function (key, param) {
			if (/\$\./.test(key)) {
				var k = key.replace(/\$\./, '');
				param = thumbnail(param, 60);
				var host = param.indexOf('http') === -1 ? API.host : '';
				params[k] = host + param;
				delete params[key];
			}
			if (typeof param === 'object' && param) {
				$.each(param, function (k, p) {
					p = prependHost(p);
				});
			}
		});
		return params;
	};

	function getTpl(id, params, callback) {
		var html = getHtml(id);
		params = $.extend(params, {}, {$$HTML: html});
		params = prependHost(params);
		prependHost(params);
		iframe.contentWindow.postMessage({id: id, params: params}, '*');
		callbacks[id] = callback;
	}

	window.safeTpl = {
		init: init,
		get: getTpl
	};

})(window, CodingAPI, Zepto, thumbnail);
