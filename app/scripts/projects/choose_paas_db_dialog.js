/* global Zepto, CodingAPI, safeTpl */
(function (window, $, CodingAPI, safeTpl) {

	var $dialog = null, doChoose;

	var show = function (data, choose) {
		safeTpl.get('choose_paas_db_dialog', data, function (html) {
			$('.dialog').remove();
			$('body').addClass('dimmer').append(html);
			$dialog = $('#choose-paas-db-dialog');
			bindEvents();
			doChoose = choose;
		});
	};

	var hide = function () {
		$dialog.off('*').remove();
		$('body').removeClass('dimmer');
	};

	var onChoose = function () {
		var self = $(this);
		var guid = self.data('guid');
		doChoose(guid);
		hide();
	};

	//events
	var bindEvents = function () {
		$dialog
			.on('click', '.close', hide)
			.on('click', '.services a.item', onChoose);
	};

	window.choosePaasDbDialog = {
		show: show,
		hide: hide
	};

})(window, Zepto, CodingAPI, safeTpl);