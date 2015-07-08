"use strict";

var React = require('react/addons');
var assign = require('object-assign');
var Loading = require('../loading');

var PropTypes = React.PropTypes;

var List = React.createClass({

    propTypes: {
        onItemClick: PropTypes.func,
        itemStyle: PropTypes.object
    },

    render: function () {
        var listStyle = {
            ul: {
                listStyle: 'none',
                padding: 0,
                margin: 0
            },
            li: {
                display: 'block',
                padding: 0,
                margin: 0
            }
        };
        var onItemClick = this.props.onItemClick || function () {};
        var itemStyle = this.props.itemStyle;
        var children = this.props.children;
        if(children && children.length > 0) {
            var lis = children.map(function (li, i) {
                var onClick = onItemClick && onItemClick.bind(null, i);
                return <li style={assign(listStyle.li, itemStyle)} data-index={i} key={i} onClick={onClick}>{li}</li>;
            });
            return <ul style={listStyle.ul}>{lis}</ul>;
        } else {
            return (
                <ul style={listStyle.ul}>
                    <li style={assign(listStyle.li, itemStyle)}>
                        <Loading show={true} words='加载中...'/>
                    </li>
                </ul>
            );
        }
    }
});

module.exports = List;
