/* global Zepto, CodingAPI, safeTpl */
(function (window, $, CodingAPI, safeTpl) {

	var dialogs = {};

	function PaasDbDialog(id) {
		this.id = id;
		dialogs[id] = this;
	};

	PaasDbDialog.prototype.show = function (data, choose) {
		var self = this;
		var id = self.id;
		safeTpl.get(id+'_paas_db_dialog', data, function (html) {
			$('.dialog').remove();
			var $dialog = $(html).attr('id', id+'-paas-db-dialog');
			$dialog.data('id', id);
			$('body').addClass('dimmer').append($dialog);
			self.doChoose = choose;
			bindEvents($dialog);
		});
	};

	var hide = function ($dialog) {
		$dialog.off('*').remove();
		$('body').removeClass('dimmer');
	};

	var choose = function (dialog, guid, id) {
		dialog.doChoose({guid: guid, id: id});
	};

	PaasDbDialog.prototype.hide = function () {
		var $dialog = $('#'+this.id+'-paas-db-dialog');
		hide($dialog);
	};

	//events
	var bindEvents = function ($dialog) {
		$dialog
			.on('click', '.close', function (event) {
				var $dialog = $(event.target).parents('.dialog');
				hide($dialog);
			})
			.on('click', '.services a.item', function (event) {
				var self = $(this);
				var guid = self.data('guid');
				var id = self.data('id');
				var $dialog = $(event.target).parents('.dialog');
				var dialogId = $dialog.data('id');
				var dialog = dialogs[dialogId];
				choose(dialog, guid, id);
				hide($dialog);
			});
	};

	window.PaasDbDialog = PaasDbDialog;

})(window, Zepto, CodingAPI, safeTpl);