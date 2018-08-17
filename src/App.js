import React, { Component } from 'react';
import MapContainer from './Map';
import Navigation from './Nav';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      items: [],
      active: false,
      tabIndex: -1
    };
  }

  componentDidMount = () => {
    this.getLocations()
    this.toggleNavigation()
    this.handleTabIndex()
    this.ifAppIsLoading()
    
  }

  componentDidUpdate = () => {
    this.handleTabIndex()
  }

  // Fetching Foursquare-API
  getLocations = () => {
    fetch(
      'https://api.foursquare.com/v2/venues/search?ll=53.350140, -6.266155&query="museum"&client_id=D0GQP4NDGYESWGEPP3YVRJQJIUGWP35KBKYAU2T1TYE0IVMA&client_secret=YFKNTG1WLS5PLNOYRI34OJFWWYLFE5I1IMICAJFHNUXIP4XM&v=20180802'
    )
      .then(res => res.json())
      .then(items => {
        this.setState({ items: items.response.venues });
      });
  }

  // When offline
  ifAppIsLoading = () => {
    var appIsOffline = document.querySelector('.App').lastElementChild;
    appIsOffline.className += 'App-offline'
    appIsOffline.innerHTML = 'Oh, it seems that there is a page load error :(';
  };


  // Nav and TabIndex
  toggleNavigation = () => {
    // toggles navigation
    const currentState = this.state.active;

    this.setState({
      active: !currentState
    });

    // handles tabIndex in Sidebar
    var menuSidebarVisible = document.querySelector('.visible');
    var menuSidebarHidden = document.querySelector('.hidden');

    if (menuSidebarVisible) {
      this.setState({
        tabIndex: 0
      });
    } else if (menuSidebarHidden) {
      this.setState({
        tabIndex: -1
      });
    }
  };

  // TabIndex
  onKeyPressed = e => {
    if (e.keyCode === 13) {
      document.activeElement.click();
    }
  };

  // TabIndex FourSquare
  handleTabIndex = i => {
    var mapLinks = document.querySelectorAll('a');

    for (i; i < mapLinks.length; i++) {
      mapLinks[i].tabIndex = '-1';
    }

    [...document.querySelectorAll('.gmnoprint')].tabIndex = [0];
  };

  // Handles marker click-states
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  // Handles Map click-states
  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  // queries
  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  // opens window after link is clicked
  onSidebarLinkClick = e => {
    let clickedMarker = [...document.querySelectorAll('.gmnoprint')];

    if (document.querySelector('.Map-container')) {
      clickedMarker.find(m => m.title === e).click();
    } else {
      this.onGetLocationsError();
    }
  };

  render() {
    const { query, items } = this.state;

    //search items
    let filterLocations;
    if (query && items) {
      const match = new RegExp(escapeRegExp(query), 'i');
      //filter items
      filterLocations = items.filter(item => match.test(item.name));
    } else {
      filterLocations = items ? items : [];
    }

    return (
      <div className='App'>
        <Navigation
          filterLocations={filterLocations}
          updateQuery={this.updateQuery}
          onSidebarLinkClick={this.onSidebarLinkClick}
          onKeyPressed={this.onKeyPressed}
          toggleNavigation={this.toggleNavigation}
          active={this.state.active}
          tabIndex={this.state.tabIndex}
        />

        <MapContainer
          filterLocations={filterLocations}
          onMapClicked={this.onMapClicked}
          onMarkerClick={this.onMarkerClick}
          onSidebarLinkClick={this.onSidebarLinkClick}
          selectedPlace={this.state.selectedPlace}
          showingInfoWindow={this.state.showingInfoWindow}
          activeMarker={this.state.activeMarker}
        />
      </div>
    );
  }
}

export default App;
