"use strict";

var React = require('react/addons');
var Avatar = require('../avatar');

var PropTypes = React.PropTypes;

var Member = React.createClass({

    propTypes: {
        avatar: PropTypes.string,
        name: PropTypes.string,
        size: PropTypes.number
    },

    render: function () {
        var {avatar, name, size} = this.props;
        size = size || 30;

        var styles = {
            wrapper: {
                position: 'relative',
                minHeight: size,
                minWidth: 180
            },
            avatar: {
                position: 'absolute',
                left: 0,
                top: 0
            },
            name: {
                marginLeft: size + 5,
                lineHeight: size + 'px',
                display: 'inline-block',
                fontSize: '12px'
            }
        };

        return (<div className="member" style={styles.wrapper}>
            <Avatar src={avatar} size={size} style={styles.avatar}/>
            <span style={styles.name}>{name}</span>
        </div>);
    }
});

module.exports = Member;