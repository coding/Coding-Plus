'use strict';
/*jshint camelcase: false */

(function (window) {
	var qiniu_img_regex = /https\:\/\/(\S+)\.qbox\.me\/(\S+)\.(png|jpg|jpeg|gif)/,
		qiniu_crop_img_regex = /(\S+)(\?imageMogr2\/auto-orient\/format\/\S+\/crop\/\!\d+x\d+a\d+a\d+)/,
		gravatar_img_regex = /^(https\:\/\/www.gravatar.com\/avatar\/\S+?s=)(\d+)/,
		fruit_img_regex = /\/static\/fruit_avatar\/Fruit\-(\d+)\.png/,
		project_img_regex = /\/static\/project\_icon\/scenery\-(\d+)\.png/;
	var qiniu_fruit_pattern = 'https://dn-coding-net-production-avatar.qbox.me/Fruit-$0.png';
	var qiniu_project_pattern = 'https://dn-coding-net-production-avatar.qbox.me/scenery-$0.png';
	var avatars_cache = {};
	var cacheSize = function (src, size) {
		var cached = avatars_cache[src];
		if (cached) {
			size = cached < size ? size : cached;
		}
		avatars_cache[src] = size;
		return size;
	};
	var thumbnail = function (src, size) {
		if (!src) {
			return src;
		}
		size = (size || 200);
		var matches = src.match(qiniu_crop_img_regex);
		var new_size = 0, no = null, new_img = null;
		if (matches && matches.length === 3) {
			var url = matches[1],
				params = matches[2];
			new_size = cacheSize(url, size);
			return [url, params, '/thumbnail/', new_size].join('');
		}
		matches = src.match(qiniu_img_regex);
		if (matches && matches.length === 4) {
			var prefix = matches[1],
				sha1 = matches[2],
				ext = matches[3];
			var tmp_src = ['https://', prefix, '.qbox.me/', sha1, '.', ext].join('');
			new_size = cacheSize(tmp_src, size);
			return [tmp_src, '?imageMogr2/thumbnail/', new_size].join('');
		}
		matches = src.match(gravatar_img_regex);
		if (matches && matches.length > 0) {
			new_size = cacheSize(src, size);
			return src.replace(gravatar_img_regex, '$1' + new_size);
		}
		matches = src.match(fruit_img_regex);
		if (matches && matches.length === 2) {
			no = matches[1];
			new_img = qiniu_fruit_pattern.replace('$0', no);
			new_size = cacheSize(new_img, size);
			return new_img + '?imageMogr2/thumbnail/' + new_size;
		}
		matches = src.match(project_img_regex);
		if (matches && matches.length === 2) {
			no = matches[1];
			new_img = qiniu_project_pattern.replace('$0', no);
			new_size = cacheSize(new_img, size);
			return new_img + '?imageMogr2/thumbnail/' + new_size;
		}
		return src;
	};
	window.thumbnail = thumbnail;
})(window);