"use strict";

var React = require('react/addons');

var PropTypes = React.PropTypes;

/**
 * Usage:
 * <Dropdown value={} onChange={}>
 *     <SelectItem/>
 *     <List>
 *         <Item/>
 *     </List>
 * </Dropdown>
 */
var Dropdown = React.createClass({

    getInitialState: function () {
        return {
            show: false
        }
    },

    componentWillMount: function () {
        document.addEventListener("click", this.handleDocumentClick, false);
    },

    componentWillUnmount: function () {
        document.removeEventListener("click", this.handleDocumentClick, false);
    },

    handleDocumentClick: function (event) {
        if (!React.findDOMNode(this).contains(event.target)) {
            this.hideDropdown();
        }
    },

    toggleDropdown: function () {
        this.setState({
            show: !this.state.show
        });
    },

    hideDropdown: function () {
        this.setState({
            show: false
        });
    },

    render: function () {
        var show = this.state.show;

        var styles = {
            dropdown: {
                position: 'relative',
                display: 'inline-block'
            },
            menu: {
                display: show ? 'block' : 'none',
                listStyle: 'none',
                position: 'absolute',
                top: '100%',
                left: 0,
                padding: 0,
                margin: 0,
                zIndex: 2,
                backgroundColor: '#FFF',
                border: '1px solid #DDD'
            }
        };

        return (
            <div className="dropdown" style={styles.dropdown} onClick={this.toggleDropdown}>
                <div className="selected">
                    {this.props.children[0]}
                </div>
                <div className="menu" style={styles.menu}>
                    {this.props.children[1]}
                </div>
            </div>
        );
    }
});

module.exports = Dropdown;