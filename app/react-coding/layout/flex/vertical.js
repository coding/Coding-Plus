"use strict";

var React = require('react/addons');
var flex = require('./flex');
var PropTypes = React.PropTypes;

/**
 * Usage:
 * <VerticalFlexLayout>
 *     <Header height="60"></Header>
 *     <Content>
 *         ..... main content .....
 *     </Content>
 *     <Footer height="50"></Footer>
 * </VerticalFlexLayout>
 *
 * Warning:
 * the n-1 children should always specify height prop
 */
var VerticalFlexLayout = React.createClass({

    propTypes: {
        layoutStyle: PropTypes.object
    },

    render: function () {
        return flex('vertical', this);
    }

});

module.exports = VerticalFlexLayout;