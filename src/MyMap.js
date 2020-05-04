import React from "react";
import { Map, TileLayer } from "react-leaflet";

const MyMap = ({ position }) => {
  return (
    <Map center={position} zoom={11.5}
    style={{ width: "400px", height: "250px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
};

export default MyMap;
