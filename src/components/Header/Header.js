import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import './Header.css';

class Header extends Component {
    openSettingPage(ev) {
        this.props.openSettingPage(ev.currentTarget);
    }
    render() {
        return (
            <div className="Header">
                <h2>YouTube Time Marker</h2>
                <span className="settingIcon" onClick = {this.openSettingPage.bind(this)}><Icon name="setting" size="large" /></span>
            </div>
        );
    }
}

export default Header;