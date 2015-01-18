/**
 * Created by bluishoul on 15/1/18.
 */

(function () {

	var fillLoginForm = function (input, credentials) {
		var name = input.name;
		var matches = {
			'auth[server]': credentials.hostname,
			'auth[username]': credentials.username,
			'auth[password]': credentials.password,
			'auth[db]': credentials.name
		};
		if(matches[name]) {
			input.value = matches[name];
		}
	};

	var doLogin = function (credentials) {
		var inputs = document.querySelectorAll('input');
		for(var i=0; i< inputs.length; i++) {
			fillLoginForm(inputs[i], credentials);
		}
		CodingStorageInstance.remove('adminer', function () {
			document.querySelector('form').submit();
		});
	};

	window.Adminer = {
		login: doLogin
	};

})(window);

CodingStorageInstance.get('adminer', function (data) {
	Adminer.login(data);
});