"use strict";

var React = require('react/addons');

var CheckBox = React.createClass({

    _onChange: function (event) {
        var onChange = this.props.onChange;
        if(onChange && event && event.target) {
            onChange(event.target.checked);
        }
    },

    render: function () {
        var checked = this.props.checked;
        return (
            <input type="checkbox" defaultChecked={checked} onChange={this._onChange.bind(null)}/>
        );
    }

});

module.exports = CheckBox;