"use strict";

var React = require('react/addons');
var PropTypes = React.PropTypes;

var Dimmer = React.createClass({

    propTypes: {
        show: PropTypes.bool,
        onClick: PropTypes.func,
        onEscPress: PropTypes.func
    },

    componentWillMount: function () {
        document.addEventListener("keyup", this.onKeyUp, false);
    },

    componentWillUnmount: function () {
        document.removeEventListener("keyup", this.onKeyUp, false);
    },

    onKeyUp: function (event) {
        var ESC = 27;
        if (event.keyCode === ESC) {
            var onEscPress = this.props.onEscPress;
            if(typeof onEscPress === 'function') {
                onEscPress();
            }
        }
    },

    render: function () {
        var {show, zIndex} = this.props;
        var styles = {
            opacity: show ? 1 : 0,
            zIndex: show ? zIndex : -2
        };
        return (
            <div className='modal-dimmer' style={styles} onClick={this.props.onClick} onKeyUp={this.onKeyUp}>
                {this.props.children}
            </div>
        );
    }

});

module.exports = Dimmer;