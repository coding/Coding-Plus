"use strict";

var React = require('react/addons');
var PropTypes = React.PropTypes;

var qiniuImageRegex = /https\:\/\/(\S+)\.qbox\.me\/(\S+)\.(png|jpg|jpeg|gif)/gmi;

var Bubble = React.createClass({

    propTypes: {
        html: PropTypes.string
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

    render : function () {

        var content = this._replaceQiniuImage(this.props.html);

        var getHtml = function () {
            return {__html: content};
        };

        return <div className="bubble markdown" dangerouslySetInnerHTML={getHtml()}></div>;
    }

});

module.exports = Bubble;
