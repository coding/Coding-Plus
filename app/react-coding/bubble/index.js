"use strict";

var React = require('react/addons');
var hljsMixin = require('../mixin/hljs');
var fancyOverflowMixin = require('../mixin/fancy-overflow');
var PropTypes = React.PropTypes;

var qiniuImageRegex = /https\:\/\/(\S+)\.qbox\.me\/(\S+)\.(png|jpg|jpeg|gif)/gmi;

var Bubble = React.createClass({

    propTypes: {
        html: PropTypes.string
    },

    mixins: [hljsMixin, fancyOverflowMixin],

    allFancyOverflowImagesLoaded: function (images) {
        console.log('==== All', images.length, 'images loaded ====');
    },

    _replaceQiniuImage: function (content) {
        this.imagesMap = this.imagesMap || {};
        var t = this;
        var newContent = content.replace(qiniuImageRegex, function () {
            var src = arguments[0];
            t.imagesMap[src] = src + '?imageInfo';
            //return 'https://coding.net/static/adddcfb37896b41779bc0976326cd798.png';
            return src;
        })
        return newContent;
    },

    componentWillMount: function () {
        this.refName = 'hljs-and-fancy-overflow';
        this.hljsRefName = this.refName;
        this.fancyOverflowRefName = this.refName;
    },

    render: function () {

        var content = this._replaceQiniuImage(this.props.html);

        var getHtml = function () {
            return {__html: content};
        };

        return <div className="bubble markdown"
                    ref={this.refName}
                    dangerouslySetInnerHTML={getHtml()}></div>;
    }

});

module.exports = Bubble;
