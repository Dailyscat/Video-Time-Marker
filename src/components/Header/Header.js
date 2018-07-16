import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <h2>Youtube Time Marker</h2>
                <span className="settingIcon"><Icon name="setting" size="large" /></span>
            </div>
        );
    }
}

export default Header;