import React from "react";
import { DateTime } from "luxon";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer } from "react-leaflet";

import icon1 from "./img/icon1.png";
import icon2 from "./img/icon2.png";
import icon3 from "./img/icon3.png";
import icon4 from "./img/icon4.png";
import icon5 from "./img/icon5.png";
import icon6 from "./img/icon6.png";

const dt = DateTime.local();
const rezoned = dt.setZone("America/Los_Angeles");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startFetch: 0, position: [] };
  }

  componentDidMount() {
    if (this.state.startFetch === 0) {
      fetch(
        "https://geo.ipify.org/api/v1?apiKey=at_NeRRZHpPFpIYsigpI8ClqB2CjZ7rm\n"
      )
        .then(response => response.json())
        // .then(result => console.log(result))
        .then(result =>
          this.setState({
            ip: result.ip,
            code: result.location.country,
            lat: result.location.lat,
            lng: result.location.lng,
            city: result.location.city
          })
        )

        .then(() =>
          fetch(`https://restcountries.eu/rest/v2/alpha/${this.state.code}`)
        )

        .then(response => response.json())
        .then(result2 =>
          this.setState({ flag: result2.flag, name: result2.name })
        )
        .catch(error => console.log("error", error))

        .catch(error => console.log("error", error));

      this.setState({ startFetch: 1 });
    }
  }

  render() {
    const newPos = [];
    newPos.push(this.state.lat);
    newPos.push(this.state.lng);

    return (
      <div className="App">
        <div id="wrapper">
          <div id="infobox">
            <div id="flag">
              <img id="theFlag" src={this.state.flag} alt={this.state.name} />
            </div>

            <div className="info">
              <div className="icon">
                <img src={icon1} alt="IP Address" />
              </div>
              <div className="value">{this.state.ip}</div>
            </div>

            <div className="info">
              <div className="icon">
                <img src={icon2} alt="Location" />
              </div>
              <div className="value">
                {this.state.city}, {this.state.name}
              </div>
            </div>

            <div className="info">
              <div className="icon">
                <img src={icon3} alt="Date" />
              </div>
              <div className="value">
                {dt.day}.{dt.month}.{dt.year}
              </div>
            </div>

            <div className="info">
              <div className="icon">
                <img src={icon4} alt="Time" />
              </div>
              <div className="value">
                {dt.toLocaleString(DateTime.TIME_SIMPLE)}{" "}
                <span id="tZone">( {dt.zoneName} ) </span>
              </div>
            </div>

            <div className="info">
              <div className="icon">
                <img src={icon5} alt="Time in NewYork" />
              </div>
              <div className="value">
                but it's {rezoned.toLocaleString(DateTime.TIME_SIMPLE)} in New
                York
              </div>
            </div>

            <div id="mapText">
              <img className="arrow" src={icon6} alt="Look below" /> In case you
              forgot where you are{" "}
              <img className="arrow" src={icon6} alt="Look below" />
            </div>

            <div id="showMap">
              {this.state.lat && this.state.lng ? (
                <Map
                  center={newPos}
                  zoom={11.5}
                  style={{ width: "350px", height: "250px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                </Map>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
