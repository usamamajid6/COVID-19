import React, { Component } from "react";
import "./Home.css";
import L from "leaflet";
// import geoJSON from "../Assets/countryGeoJSON.json";

let geojson = L.geoJSON();
let info = L.control();
let legend;



class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 21.3891, lng: 39.8579 },
      zoom: 2,
      geoJSON: props.geoJSON,
    };
  }
  componentDidMount = () => {
    this.loadMap();
    // console.log(this.state.geoJSON);
    
  };
  loadMap = () => {
    this.map = L.map("map", {
      center: [this.state.center.lat, this.state.center.lng],
      zoom: this.state.zoom,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    geojson = L.geoJson(this.state.geoJSON, {
      style: this.style,
      onEachFeature: this.onEachFeature,
    });
    geojson.addTo(this.map);

    info.onAdd = (map) => {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      info.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = (props) => {
      this._div.innerHTML =
        "<h4>CORONA STATUS</h4>" +
        (props
          ? "<b>" +
            props.name +
            "</b><br />" +
            "Total Cases: " +
            props.cases +
            "</b><br />" +
            "Recovered: " +
            props.recovered +
            "</b><br />" +
            "Deaths: " +
            props.deaths +
            "</b><br />" +
            "Active Cases: " +
            props.active
          : "Hover over a country");
    };

    info.addTo(this.map);

    legend = L.control({ position: "bottomright" });

    legend.onAdd = (map) => {
      var div = L.DomUtil.create("div", "info legend"),
        grades = [0, 1000, 2000, 5000, 10000, 20000, 50000, 100000];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          this.getColor(grades[i] + 1) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };

    legend.addTo(this.map);
  };

  highlightFeature = (e) => {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    info.update(layer.feature.properties);
  };

  resetHighlight = (e) => {
    geojson.resetStyle(e.target);
    info.update();
  };

  zoomToFeature = (e) => {
    this.map.fitBounds(e.target.getBounds());
  };

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature,
    });
  };

  getColor = (d) => {
    return d > 100000
      ? "#007bff"
      : d > 50000
      ? "#268fff"
      : d > 20000
      ? "#4fa4ff"
      : d > 10000
      ? "#6bb3ff"
      : d > 5000
      ? "#8ac3ff"
      : d > 2000
      ? "#add5ff"
      : d > 1000
      ? "#c4e1ff"
      : "#deeeff";
  };

  style = (feature) => {
    return {
      fillColor: this.getColor(feature.properties.cases),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };
  render() {
    return <div id="map" className="map"></div>;
  }
}

export default Map;
