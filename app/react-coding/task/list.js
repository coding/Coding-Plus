'use strict';

var React = require('react');
var Task = require('./index');
var List = require('../list');
var qwest = require('qwest');

var Tasks = React.createClass({


    getInitialState: function () {
        return {
            tasks: []
        };
    },

    componentWillMount: function () {
        var t = this;
        var promise = qwest.get('https://coding.net/api/tasks/processing?page=1&pageSize=20');
        promise.then(function (response) {
            var tasks = response.data && response.data.list || [];
            t.setState({
                tasks: tasks
            });
        });
    },

    render: function () {
        var list = [];
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            list.push(
                <Task key={task.id}
                      content={task.content}
                      status={task.status}
                      creator={task.creator}
                      project={task.project}/>
            );
        }
        return list.length > 0 ? (<List>{list}</List>) : (<span>Loading...</span>);
    }
});

module.exports = Tasks;
