'use strict';

var React = require('react/addons');
var PropTypes = React.PropTypes;

var Layout = require('../layout/flex/vertical');
var Dimmer = require('./dimmer');
var ModalExample = require('./example/plain');

/**
 * Usage:
 * <Modal>
 *     <header></header>
 *     <main></main>
 *     <footer></footer>
 * </Modal>
 */
var Modal = React.createClass({

        propTypes: {
            show: PropTypes.bool,
            onClose: PropTypes.func
        },

        getInitialState: function () {
            return {
                show: false,
                init: false
            };
        },

        getDefaultProps: function () {
            return {
                height: 300,
                width: 500,
                zIndex: 1000
            };
        },

        componentWillReceiveProps: function (props) {
            this.setState({
                show: props.show
            });
            this.closing = !props.show;
        },

        componentDidMount: function () {
            this.whichTransitionEvent = (function () {
                var t;
                var el = document.createElement('fakeelement');
                var transitions = {
                    'transition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'MozTransition': 'transitionend',
                    'WebkitTransition': 'webkitTransitionEnd'
                }
                for (t in transitions) {
                    if (el.style[t] !== undefined) {
                        return transitions[t];
                    }
                }
            })();
            React.findDOMNode(this.refs['primitive-modal-wrapper'])
                .addEventListener(this.whichTransitionEvent, this._onTransitionEnd);
        },

        componentDidUnmount: function () {
            React.findDOMNode(this.refs['primitive-modal-wrapper'])
                .removeEventListener(this.whichTransitionEvent, this._onTransitionEnd);
        },

        _onTransitionEnd: function (event) {
            if(this.isMounted() && event.propertyName === 'z-index') {
                this.setState({
                    init: !this.closing
                });
            }
        },

        _onDimmerClick: function (event) {
            if (event.target.isEqualNode(React.findDOMNode(this).childNodes[0])) {
                this.closeModal();
            }
        },

        closeModal: function () {
            this.closing = true;
            this.setState({
                show: false
            });
            var onClose = this.props.onClose;
            if (typeof onClose === 'function') {
                onClose();
            }
        },

        render: function () {

            var {height, width, zIndex} = this.props;

            var show = this.state.show;

            var headerHeight = 50;

            var styles = {
                wrapper: {
                    height: height,
                    width: width,
                    marginLeft: -(width / 2),
                    marginTop: -(height / 2),
                    zIndex: show ? zIndex : -1,
                    opacity: show ? 1 : 0,
                    WebkitTransform: show ? 'scale(1)' : 'scale(.5)',
                    MozTransform: show ? 'scale(1)' : 'scale(.5)',
                    MsTransform: show ? 'scale(1)' : 'scale(.5)',
                    OTransform: show ? 'scale(1)' : 'scale(.5)',
                    transform: show ? 'scale(1)' : 'scale(.5)'
                },
                header: {
                    height: headerHeight,
                    lineHeight: headerHeight / 2 + 'px'
                },
                footer: {
                    height: headerHeight,
                    lineHeight: headerHeight / 2 + 'px'
                }
            };

            var inner = (<span>Loading</span>);

            if (this.state.init) {
                inner = (
                    <Layout>
                        <header height={headerHeight} style={styles.header}>
                            {this.props.children[0]}
                        </header>
                        <main>
                            {this.props.children[1]}
                        </main>
                        <footer height={headerHeight} style={styles.footer}>
                            {this.props.children[2]}
                        </footer>
                    </Layout>
                );
            }


            return (
                <div>
                    <Dimmer show={show} zIndex={zIndex + 100}
                            onClick={this._onDimmerClick}
                            onEscPress={this.closeModal}>
                        <div ref="primitive-modal-wrapper" className='primitive-modal' style={styles.wrapper}>
                            {{inner}}
                        </div>
                    </Dimmer>
                </div>
            );
        }

    });

module.exports = Modal;
