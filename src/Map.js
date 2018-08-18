import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from "prop-types";
import "./App.css";

export class MapContainer extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired,
    onSidebarLinkClick: PropTypes.func.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    onMapClicked: PropTypes.func.isRequired,
    selectedPlace: PropTypes.object.isRequired,
    showingInfoWindow: PropTypes.bool.isRequired
  };

  render() {
    const {
      filterLocations,
      onMapClicked,
      onMarkerClick,
      selectedPlace,
      activeMarker,
      showingInfoWindow
    } = this.props;

    return (
      <div className="Map-container" role="application">
        <header>Museums in the &hearts; of Dublin</header>

        <Map
          google={this.props.google}
          className={"Map"}
          onClick={onMapClicked}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            float: "left"
          }}
          initialCenter={{
            lat: 53.35014,
            lng: -6.266155
          }}
          zoom={15}
          disableDefaultUI={true}>

          {filterLocations.map(item => {
            // filter locations and create a marker
            return (
              <Marker
                title={item.name} // filters markers
                key={item.id}
                id={item.id}
                name={item.name}
                onClick={onMarkerClick}
                // onMouseover={this.onMouseoverMarker}
                icon={{
                  path: this.props.google.maps.SymbolPath.CIRCLE,
                  scale: 8
                }}
                animation={
                  activeMarker ? item.name === activeMarker.title ? "1" : "0"   : "0"
                }
                position={{
                  lat: item.location.lat,
                  lng: item.location.lng
                }}
                address={item.location.address}
              />
            );
          })}

          <InfoWindow marker={activeMarker} visible={showingInfoWindow} maxWidth={200}>
            <div style={{ color: "darkgreen" }}>
              <h1 tabIndex={"0"}>{selectedPlace.name}</h1>
              <p tabIndex={"0"}>{selectedPlace.address}</p>
              <p tabIndex={"0"}>Source: <a href="http://foursquare.com" target="_blank" rel="noopener noreferrer">&copy; Foursquare</a></p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

Map.PropTypes = {
  locations: PropTypes.array.isRequired
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDIiEtOWFZYYl10iYBjcMte_ynGzybwGJwY&v&v"
})(MapContainer);
