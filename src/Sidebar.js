import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

class Sidebar extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired
  };

  render() {
    const { filterLocations } = this.props;

    var sidebarListElements = filterLocations.map(item => {
      return (
        <li
          className="Sidebar-location"
          id={item.id}
          role="menuitem"
          onClick={e => this.props.onClick(item.name)}
          key={item.name}
          tabIndex="0"
          >
          {item.name}
        </li>
      );
    });

    return (
      <div className="App-sidebar">
        <div className="filter" id="filter-input">
          <input
            tabIndex="0"
            className="filter-locations"
            type="text"
            aria-label="filter"
            name="filter"
            placeholder="Filter Museums here"
            value={this.props.query}
            onChange={e => this.props.onChange(e.target.value)}
          />
        </div>

        <div className="Sidebar-locations">
          {sidebarListElements.length ? (sidebarListElements):( <p>No locations found :(</p>
          )}
        </div>
      </div>
    );
  }
}

Sidebar.PropTypes = {
  locations: PropTypes.array.isRequired
};

export default Sidebar;
