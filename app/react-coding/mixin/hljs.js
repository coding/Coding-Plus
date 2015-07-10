"use strict";
var React = require('react/addons');
var hljs = require('highlight.js');

/**
 * Usage:
 *  Just set "ref" attr with this.hljsRefName on the DOM contains the code
 *
 * Example:
 *  <div class="markdown" ref={this.hljsRefName}></div>
 *
 * Customize ref value:
 *  componentWillMount: function () {
 *      this.hljsRefName = 'CUSTOMIZED-HLJS-REF-NAME';
 *  }
 *
 */
var hljsMixin = {
    componentWillMount: function () {
        this.hljsRefName = 'hljs-code';
    },
    componentDidMount: function () {
        var ref = this.hljsRefName;
        var content = React.findDOMNode(this.refs[ref]);
        if (content) {
            var codes = content.querySelectorAll('pre code');
            for (var i = 0; i < codes.length; i++) {
                var code = codes[i];
                hljs.highlightBlock(code);
            }
        }
    }
};

module.exports = hljsMixin;
