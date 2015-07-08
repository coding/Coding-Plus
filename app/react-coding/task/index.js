'use strict';

var React = require('react'),
    CheckBox = require('../form/checkbox'),
    MemberPicker = require('../member-picker');

var PropTypes = React.PropTypes;

var Task = React.createClass({

    propTypes: {
        content: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        creator: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired,
        onUpdate: PropTypes.func
    },

    _handleUpdate: function (field, value) {
        var onUpdate = this.props.onUpdate;
        if(onUpdate) {
            onUpdate(field, value)
        }
    },

    render: function () {
        var {creator, project, content, status} = this.props;
        var checked = status === 2;

        var styles = {

        };

        return (<div className="task">
            <CheckBox checked={checked} onChange={this._handleUpdate.bind(null, 'status')}/>
            <span className="content">{content}</span>
            <MemberPicker member={creator} project={project} onChnage={this._handleUpdate.bind(null, 'owner')}/>
        </div>);

    }
});

module.exports = Task;