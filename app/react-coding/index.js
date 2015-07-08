'use strict';

var React = require('react');
var MainLayout = require('./layout/flex/vertical');
var List = require('./list');
var BubbleList = require('./bubble/list');

var demoVerticalStyle = {
    backgroundColor: '#FFF',
    color: '#000',
    lineHeight: '60px',
    textAlign: 'center',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    fontSize: 18
};

React.render(
    <MainLayout>
        <header height="60" style={demoVerticalStyle}>
            冒泡
        </header>
        <div className="content-wrapper">
            <BubbleList/>
        </div>
    </MainLayout>,
    document.getElementsByTagName('body')[0]
);
