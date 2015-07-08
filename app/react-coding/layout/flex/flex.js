"use strict";

var React = require('react/addons');
var assign = require('object-assign');
var styles = require('./flex.styles');

var directionProps = {
    vertical: {
        wrapperClassName: 'vertical-flex-layout',
        autoChildClassName: 'vertical-flex-auto-item',
        specifyChildClassName: 'vertical-specify-height-item',
        specifyName: 'height',
        directionStyle: styles.flex_direction_column
    },
    horizontal: {
        wrapperClassName: 'horizontal-flex-layout',
        autoChildClassName: 'horizontal-flex-auto-item',
        specifyChildClassName: 'horizontal-specify-width-item',
        specifyName: 'width',
        directionStyle: styles.flex_direction_row
    }
};

var layoutDisplayName = ['HorizontalFlexLayout', 'VerticalFlexLayout'];

/**
 * Build a flex layout for elements
 * @param direction 'vertical' or 'horizontal'
 * @param self current component
 */
var flexLayout = function (direction, self) {

    var props = self.props;
    var children = props.children;

    if (direction !== 'vertical' && direction !== 'horizontal') return;

    var directionValue = directionProps[direction];

    var specifyPropName = directionValue.specifyName;// height OR width

    var fullSizeStyle = {height: '100%', width: '100%'};

    var wrapperStyles = assign(
        directionValue.directionStyle,
        styles.flex_auto_justify,
        styles.flex_box,
        fullSizeStyle
    );

    var inners = (children || []).map(function (child, i) {

        var childStyle = {}, className = '';
        var specifyProp = child.props[specifyPropName];

        if (specifyProp) {//child with 'width' OR 'height' prop

            var specifyStyle = {};
            specifyStyle[specifyPropName] = specifyProp;// {height: height} OR {width: width}
            childStyle = specifyStyle;

            className = directionValue.specifyChildClassName;

        } else {//child which auto adjust size

            // wrapped flex layout: a flex layout is a child of flex layout
            var isWrapped = layoutDisplayName.indexOf(child.type.displayName) >= 0;
            if (isWrapped) {
                return child;
            }

            childStyle = assign(
                styles.flex_auto_justify,
                isWrapped ? styles.flex_box : {overflow: 'auto'}
            );
            className = directionValue.autoChildClassName;
        }

        childStyle = assign(childStyle, child.props.layoutStyle);

        return <div className={className} key={i} style={childStyle}>{child}</div>;
    });

    return (
        <div className={directionValue.wrapperClassName} style={wrapperStyles}>
            {inners}
        </div>
    );

};

module.exports = flexLayout;