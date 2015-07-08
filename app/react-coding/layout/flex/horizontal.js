"use strict";

var React = require('react/addons');
var flex = require('./flex') || function () {};
var PropTypes = React.PropTypes;

var HorizontalFlexLayout = React.createClass({

    propTypes: {
        layoutStyle: PropTypes.object
    },

    render: function (){
        return flex('horizontal', this);
    }

});

module.exports = HorizontalFlexLayout;