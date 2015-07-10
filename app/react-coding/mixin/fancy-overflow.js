"use strict";
var React = require('react/addons');
var $ = require('jquery');

/**
 * Usage:
 *  Just set "ref" attr with this.fancyOverflowRefName on the DOM
 *
 * Example:
 *  <div class="markdown" ref={this.fancyOverflowRefName}></div>
 *
 * Customize:
 *  1. fancyOverflowRefName
 *  2. fancyOverflowMaxHeight: max height for DOM  to show the fancy overflow dimmer
 *  componentWillMount: function () {
 *      this.fancyOverflowRefName = 'CUSTOMIZED-FANCY-OVERFLOW-REF-NAME';
 *      this.fancyOverflowMaxHeight = 600;
 *  }
 *
 */
var fancyOverflowMixin = {

    componentWillMount: function () {
        this.fancyOverflowRefName = 'fancy-overflow';
        this.allFancyOverflowImages = [];
        this.allFancyOverflowImagesCount = 0;
        this.fancyOverflowMaxHeight = 600;
    },

    _fancyOverflowAllImagesLoaded: function ($content, images) {
        var fancyOverflowClassName = 'fancy-overflow';
        var height = $content.height();
        var isOverflow = height > this.fancyOverflowMaxHeight;
        if (isOverflow) {
            $content.addClass(fancyOverflowClassName);
            $content.css({
                height: this.fancyOverflowMaxHeight + 'px'
            });
            var $dimmer = $('<div class="fancy-overflow-dimmer"></div>');
            $dimmer.on('click', function () {
                $content.removeClass(fancyOverflowClassName);
                $content.css('height', 'auto');
                $dimmer.remove();
            });
            $content.append($dimmer);
        }
        var imageLoadedFunc = this.allFancyOverflowImagesLoaded;
        if (typeof imageLoadedFunc === 'function') {
            imageLoadedFunc(images, height, isOverflow);
        }
    },

    componentDidMount: function () {
        var ref = this.fancyOverflowRefName;
        var $content = $(React.findDOMNode(this.refs[ref]));
        if ($content.length > 0) {
            var images = $content.find('img');
            var allDoneCallback = this._fancyOverflowAllImagesLoaded.bind(this, $content);
            if (images.length === 0) {
                allDoneCallback([]);
                return;
            }
            $content.css('max-height', '10000px');
            for (var i = 0; i < images.length; i++) {
                var img = images[i];
                this.allFancyOverflowImages.push(img.src);
                img.onload = function () {
                    if (++this.allFancyOverflowImagesCount === this.allFancyOverflowImages.length) {
                        allDoneCallback(images);
                    }
                }.bind(this);
            }
        }
    }
};

module.exports = fancyOverflowMixin;
