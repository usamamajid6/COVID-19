import React, { Component } from "react";
import Choropleth from "react-leaflet-choropleth";
import { Map } from "react-leaflet";
import L from "leaflet";
import geoJSON from "./Assets/countryGeoJSON.json";
const style = {
  fillColor: "#F28F3B",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.5,
};
class Test extends Component {
  state = {};
  componentDidMount = () => {
    this.map = L.map("map", {
      center: [21.3891, 39.8579],
      zoom: 3,
    });
    L.tileLayer(
      "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
      {
        maxZoom: 20,
        attribution:
          '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);
    L.geoJson(geoJSON).addTo(this.map);
  };
  render() {
    return (
      <div>
        <div
          id="map"
          style={{ width: "100%", height: "100%", position: "absolute" }}
        ></div>
      </div>
    );
  }
}

export default Test;
