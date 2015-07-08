"use strict";

var React = require('react/addons');
var Bubble = require('./index');
var List = require('../list');
var Loading = require('../loading');
var qwest = require('qwest');

var BubbleList = React.createClass({

    getInitialState: function () {
        return {
            bubbles: []
        };
    },

    componentWillMount: function () {
        var api = 'https://coding.net/api/tweet/public_tweets?filter=true&size=20&sort=time';
        var t = this;
        var promise = qwest.get(api);
        promise.then(function (response) {
            var bubbles = (response.data || []);
            t.setState({
                bubbles: bubbles
            });
        });
    },

    render: function () {

        var bubbles = this.state.bubbles;

        var list = bubbles.map(function (bubble) {
            return (
                <Bubble key={bubble.id} html={bubble.content}></Bubble>
            );
        });

        var liStyle = {
            marginBottom: 40,
            padding: '10px',
            border: '1px solid #EEE',
            background: '#FFF',
            borderRadius: 5
        };

        return (
            <div className="bubble-list">
                <List itemStyle={liStyle}>{list}</List>
            </div>
        );
    }

});

module.exports = BubbleList;
