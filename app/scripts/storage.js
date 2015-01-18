/**
 * Because of this Chromium bug (https://code.google.com/p/chromium/issues/detail?id=234497)
 * we are unable to use chrome.storage API in the context, other than background page.
 * Luckily, we can work around this issue with the help of the chrome.runtime API:
 */
(function (window, undefined) {

	var randomID = function () {
		return Math.random().toString(36).substring(2);
	};

	function StorageApiBridge() {

		if(StorageApiBridge.instance) {
			throw new Error("StorageApiBridge constructor must be called only once");
		}else{
			StorageApiBridge.instance = this;
		}

		var callbacks = {}
			, port = chrome.runtime.connect({name: "chrome.storage port"});

		port.onMessage.addListener(function(msg) {
			var callback = callbacks[msg.message_id];
			delete msg.message_id;
			callback(msg);
		});

		function postMessage(method, key, value, callback) {
			var message_id = randomID();
			callbacks[message_id] = callback;
			port.postMessage({method: method, key: key, value: value, message_id: message_id});
		}

		this.get = function(key, callback) {
			postMessage("get", key, null, callback);
		};

		this.set = function(key, value, callback) {
			postMessage("set", key, value, callback);
		};

		this.remove = function (key, callback) {
			postMessage('remove', key, null, callback);
		};

	}

	new StorageApiBridge();

	window.CodingStorageInstance = StorageApiBridge.instance;

})(window);