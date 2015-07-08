"use strict";

var React = require('react/addons');
var Dropdown = require('../dropdown');
var Member = require('./member');
var Avatar = require('../avatar');
var List = require('../list');
var qwest = require('qwest');

var PropTypes = React.PropTypes;

var MemberPicker = React.createClass({

    getInitialState: function () {
        return {
            selectedMember: this.props.member,
            allMembers: []
        };
    },

    componentWillMount: function () {
        var t = this;
        var promise = qwest.get('https://coding.net/api/project/' + this.props.project.id + '/members?page=1&pageSize=200');
        promise.then(function (response) {
            var members = (response.data && response.data.list || []).map(function (member) {
                return member.user;
            });
            t.setState({
                allMembers: members
            });
        });
    },

    propTypes: {
        member: PropTypes.object,
        project: PropTypes.object
    },

    onItemClick: function (i) {
        this.setState({
            selectedMember: this.state.allMembers[i]
        });
    },

    render: function () {
        var {selectedMember, allMembers} = this.state;
        var list = (allMembers || []).map(function (member, i) {
            return <Member key={i} avatar={member.avatar} size={30} name={member.name}/>;
        });
        return allMembers.length > 0 ? (
            <Dropdown>
                <Avatar src={selectedMember.avatar} size={30}/>
                <List onItemClick={this.onItemClick}>
                    {list}
                </List>
            </Dropdown>
        ) : <span>Loading...</span>;
    }
})


module.exports = MemberPicker;
