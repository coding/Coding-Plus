'use strict';

var React = require('react/addons');
var assign = require('object-assign');
var HOST = 'http://coding.net';
var PureRenderMixin = React.addons.PureRenderMixin;
var PropTypes = React.PropTypes;

var Avatar = React.createClass({

    mixins:  [PureRenderMixin],

    propTypes: {
        size: PropTypes.number.isRequired,
        path: PropTypes.string,
        src: PropTypes.string,
        radius: PropTypes.number
    },

    render: function () {

        var {src, size, path, style} = this.props;

        var radius = this.props.radius || 3,
            newStyle = assign({
                borderRadius: radius,
                WebkitBorderRadius: radius,
                MozBorderRadius: radius,
                MsBorderRadius: radius,
                OBorderRadius: radius,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }, style);

        if (src && src.indexOf('http') === -1) {
            src = HOST + src;
        }

        if (path && path.indexOf('http') === -1) {
            path = HOST + path
        }

        var img = <img className="coding-avatar"
                       style={newStyle} width={size} height={size} src={src}/>;

        if (path) {
            return <a key={path} href={path}>{img}</a>;
        }
        return img;


    }
});

module.exports = Avatar;
