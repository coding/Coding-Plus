'use strict';

/* global $, CodingAPI, safeTpl, SHA1 */

$(function () {

	safeTpl.init();

	chrome.windows.getCurrent(function () {
	});

	CodingAPI.me(function (result) {
		var data = {};
		if (!result.code) {
			var user = result.data;
			data = {name: user.name, '$.avatar': user.avatar, '$.path': user.path};
		}
		safeTpl.get('header', data, function (html) {
			$('#header').html(html);
		});
	});

	var allProjects = [];

	var renderProjects = function (prjs) {
		safeTpl.get('project', {projects: prjs}, function (html) {
			$('#projects').html(html);
		});
	};

	var loadPaasInfo = function (prjs) {
		var count = 0;
		var running = [],
			normal = [];
		$.each(prjs, function (index, prj) {
			CodingAPI.paas(prj.user, prj.name, function (result) {
				if (!result.error) {
					prj.running = true;
					prj.memory = result.memory;
					prj.site = result.url;
					running.push(prj);
				} else {
					normal.push(prj);
				}
				count++;
				if (count === prjs.length) {
					running = Array.prototype.sort.call(running, function (a, b) {
						return a.memory > b.memory ? -1 : 1;
					});
					var all = running.concat(normal);
					renderProjects(all);
				}
			});
		});

	};

	var loadProjects = function () {
		CodingAPI.projects('all', function (projects) {
			if (!projects.code) {
				var prjs = $.map(projects, function (project) {
					return {
						/*jshint camelcase: false */
						'user': project.owner_user_name,
						'$.path': project.project_path,
						'$.icon': project.icon,
						'name': project.name
					};
				});
				renderProjects(prjs);
				loadPaasInfo(prjs);
				allProjects = prjs;
			} else {
				safeTpl.get('unlogin_content', {}, function (html) {
					$('#projects').html(html);
				});
			}
		});
	};

	//toggle project toolbar
	$('#projects').on('click', '.project', function (event) {
		var target = $(event.target);
		if (!target.is('.running') || target.is('.toolbar, .toolbar *')) {
			return;
		}
		var self = $(this);
		var isOpen = self.is('.open');
		$('#projects .project.open').removeClass('open');
		if (!isOpen) {
			self.addClass('open');
		}
	});

	var showDeletePaasDialog = function (project) {
		safeTpl.get('delete_paas_dialog', {project: project}, function (html) {
			$('body').addClass('dimmer').append(html);
			$('#delete-paas-dialog input').focus();
		});
	};

	var hideDeletePaasDialog = function () {
		$('#delete-paas-dialog').remove();
		$('body').removeClass('dimmer');
	};

	var showDeletePaasDialogError = function(msg){
		var password = $('#delete-paas-dialog .password');
		password.find('.error').html(msg);
		password.addClass('deleting-error');
		setTimeout(hideDeletePaasDialogError, 2000);
	};

	var hideDeletePaasDialogError = function(){
		var password = $('#delete-paas-dialog .password');
		password.removeClass('deleting-error');
	};

	//stop paas
	$('#projects').on('click', '.project .toolbar-item', function () {
		var self = $(this),
			parent = self.parent();
		var action = self.data('action');
		var user = parent.data('user');
		var project = parent.data('project');
		if (action === 'remove') {
			var deletePaas = function (password) {
				CodingAPI.deletePaas(user, project, password, function (result) {
					if(result.error){
						showDeletePaasDialogError(result.message);
					}else{
						hideDeletePaasDialog();
						loadPaasInfo(allProjects);
					}
				});
			};
			showDeletePaasDialog(project);
			var doDelete = function () {
				var input = $('#delete-paas-dialog input');
				var password = SHA1(input.val());
				deletePaas(password);
			};
			$('body').on('click', '#delete-paas-dialog .delete-paas.button', doDelete);
		} else {
			var player = CodingAPI.player(user, project);
			player(action, function () {
				loadPaasInfo(allProjects);
			});
		}
	});

	//footer tabs event
	$('#footer .tabs').on('click', '.tab-item', function () {
		var self = $(this);
		var target = self.data('target');
		if (target === 'projects') {
			$('#share').hide();
			$('#projects').show();
		} else {
			$('#share').show();
			$('#projects').hide();
		}
		$('#footer .tabs .tab-item.active').removeClass('active');
		self.addClass('active');
	});

	//delete paas dialog event
	$('body').on('click', '#delete-paas-dialog .close', hideDeletePaasDialog);

	//share plugin
	var showShareMsg = function (content, isError) {
		var msg = $('#share .msg');
		msg.addClass('active');
		if(isError){
			msg.addClass('error');
		}
		msg.html(content);
		setTimeout(hideShareMsg, 2000);
	};

	var hideShareMsg = function(){
		var msg = $('#share .msg');
		msg.removeClass('active error').html();
	};

	$('#share').on('click', '.share-button .button', function(){
		var textarea = $('textarea[name="share-content"]');
		var content = textarea.val();
		CodingAPI.share(content, function(result){
			if(result.code){
				showShareMsg(result.msg || result.message, true);
			}else{
				showShareMsg('分享成功！', false);
			}
		});
	});

	loadProjects();

});