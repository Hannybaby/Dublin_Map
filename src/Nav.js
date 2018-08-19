import React, { Component } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import "./App.css";

class Nav extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired,
    onKeyPressed: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    toggleNavigation: PropTypes.func.isRequired
  };

  render() {
    const {
      filterLocations,
      onKeyPressed,
      toggleNavigation,
      active
    } = this.props;

    return (
      <div>
        <div className="App-nav-container">
          <nav className="App-navigation">
            <div id="pointer">
              <span
                id="toggle-menu"
                className="button"
                role="button"
                aria-label="menu-button"
                tabIndex="0" 
                onKeyDown={e => onKeyPressed(e)}
                onClick={toggleNavigation} >
                <span />
                <span />
                <span />
              </span>
            </div>

            <ul
              id="menu" 
              role="menu"
              className={active ? "visible" : "hidden"}
              onKeyDown={e => onKeyPressed(e)} >
              <Sidebar
                filterLocations={filterLocations}
                onChange={this.props.updateQuery}
                onClick={this.props.onSidebarLinkClick}
                tabIndex={this.props.tabIndex} />
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Nav;
