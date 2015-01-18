'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onConnect.addListener(function (port) {
	if (port.name == "chrome.storage port") {
		port.onMessage.addListener(function (msg) {

			var method = msg.method,
				key = msg.key, value = msg.value,
				message_id = msg.message_id;

			if(method === 'get') {
				var items = localStorage.getItem(key);
				items = JSON.parse(items);
				items = items || {};
				items.message_id = message_id;
				port.postMessage(items);
			} else if(method === 'set') {
				localStorage.setItem(key, JSON.stringify(value));
				port.postMessage({
					message_id: message_id
				});
			} else if(method === 'remove') {
				localStorage.removeItem(key);
				port.postMessage({
					message_id: message_id
				});
			}

		});
	}
});