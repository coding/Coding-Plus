/**
 * Created by bluishoul on 15/1/18.
 */
/* global CodingAPI*/
(function (window, CodingAPI, CodingStorageInstance) {

	var ADMINER_URL = 'http://db-admin.coding.io';
	var callbacks = {},
		port = chrome.runtime.connect({name: 'adminer port'});

	var postMessage = function(method, data, callback) {
		var message_id = CodingAPI.randomID();
		callbacks[message_id] = callback;
		port.postMessage({method: method, data: data, message_id: message_id});
	};

	var login = function (credentials, callback) {
		CodingStorageInstance.set('adminer', credentials, function () {
			chrome.tabs.create({url: ADMINER_URL}, callback);
		});
	};

	window.Adminer = {
		login: login
	};

})(window, CodingAPI, CodingStorageInstance);