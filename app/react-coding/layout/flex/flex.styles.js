"use strict";

var flex = 'flex',
    none = 'none',
    vertical = 'vertical',
    horizontal = 'horizontal',
    row = 'row',
    column = 'column',
    stretch = 'stretch',
    flex_start = 'flex-start';

var styles = {
    flex_box: {
        display: flex
    },
    flex_none: {
        WebkitFlex: none,
        MozFlex: none,
        MsFlex: none,
        OFlex: none,
        flex: none
    },
    flex_auto_justify: {
        WebkitFlex: 1,
        MozFlex: 1,
        MsFlex: 1,
        OFlex: 1,
        flex: 1
    },
    flex_direction_row: {
        MsBoxOrient: vertical,
        WebkitFlexDirection: row,
        flexDirection: row,
        justifyContent: flex_start,
        alignItems: stretch,
        alignContent: stretch
    },
    flex_direction_column: {
        MsBoxOrient: horizontal,
        WebkitFlexDirection: column,
        flexDirection: column,
        justifyContent: flex_start,
        alignItems: stretch,
        alignContent: stretch
    }
};

module.exports = styles;

