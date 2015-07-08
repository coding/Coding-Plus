"use strict";

var React = require('react/addons');
var PropTypes = React.PropTypes;

var Loading = React.createClass({

    propTypes: {
        show: PropTypes.bool,
        words: PropTypes.string
    },

    render: function () {

        if (this.props.show) {
            return (
                <div className="spinner" data-words={this.props.words}>
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        } else {
            return <span style={{display: 'none'}}></span>;
        }
    }

});

module.exports = Loading;
