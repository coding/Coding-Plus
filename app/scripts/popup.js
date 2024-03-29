'use strict';

/* global $, CodingAPI, safeTpl,chrome */

$(function () {

    safeTpl.init();

    CodingAPI.me(function (result) {
        var data = {};
        if (!result.code) {
            var user = result.data;
            window.currentUser = user;
            data = {name: user.name, '$.avatar': user.avatar, '$.path': user.path};
        }
        safeTpl.get('header', data, function (html) {
            $('#header').html(html);
        });
    });

    //footer tabs event
    $('#footer .tabs').on('click', '.tab-item', function () {
        var self = $(this);
        var target = self.data('target');
        if (target === 'projects') {
            $('#share').hide();
            $('#projects').show();
        } else if (target === 'share') {
            $('#share').show();
            $('#projects').hide();
        } else if (target === '2.0') {
            chrome.tabs.create({url: '/react-coding/index.html'});
        }
        $('#footer .tabs .tab-item.active').removeClass('active');
        self.addClass('active');
    });

    //share plugin
    var showShareMsg = function (content, isError) {
        var msg = $('#share .msg');
        msg.addClass('active');
        if (isError) {
            msg.addClass('error');
        }
        var ctn = '';
        if (typeof content === 'object') {
            $.each(content, function (k, v) {
                ctn += v + ' ';
            });
        } else {
            ctn = content;
        }
        msg.html(ctn);
        setTimeout(hideShareMsg, 2000);
    };

    var hideShareMsg = function () {
        var msg = $('#share .msg');
        msg.removeClass('active error').html();
    };

    $('#share').on('click', '.share-button .button', function () {
        var textarea = $('textarea[name="share-content"]');
        var content = textarea.val();
        CodingAPI.share(content, function (result) {
            if (result.code) {
                showShareMsg(result.msg || result.message, true);
            } else {
                showShareMsg('分享成功！', false);
            }
        });
    });

});
