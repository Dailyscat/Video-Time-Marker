import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingPage: false
    };
  }

  openSettingPage(ev) {
    this.props.openSettingPage(ev.currentTarget);
    this.setState({
      settingPage: !this.state.settingPage
    });
  }
  render() {
    return (
      <div className="Header">
        <h2>YouTube Time Marker</h2>
        <span className="settingIcon" onClick={this.openSettingPage.bind(this)}>
          {this.state.settingPage ? (
            <Icon name="close" size="large" />
          ) : (
            <Icon name="setting" size="large" />
          )}
        </span>
      </div>
    );
  }
}

export default Header;
