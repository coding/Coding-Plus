"use strict";

var React = require('react/addons');
var Modal = require('../modal');

var ModalExample = React.createClass({

    getInitialState: function () {
        return {
            show: false
        }
    },

    _showModal: function () {
        this.setState({
            show: true
        });
    },

    _hideModal: function () {
        this.setState({
            show: false
        });
    },

    _onClose: function () {
        this.setState({
            show: false
        });
    },

    render: function () {

        var button = <button onClick={this._showModal}>Show Modal</button>;
        if (this.state.show) {
            button = <button onClick={this._hideModal}>Hide Modal</button>;
        }

        return (
            <div className="modal-example">
                {button}
                <Modal show={this.state.show} onClose={this._onClose}>
                    <span>Header</span>
                    <span>
                        Content
                    </span>
                    <span>Footer</span>
                </Modal>
            </div>
        );
    }

});

module.exports = ModalExample;