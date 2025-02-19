import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Wrapper from "../assets/wrappers/MapWrapper";

const Map = ({ data }) => {
  const destinations = data.destinations || [];
  return (
    <Wrapper>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((destination) => {
          return (
            <Marker
              position={[destination.lat, destination.lon]}
              key={destination._id}
            >
              <Popup>
                {destination.name}, <br /> {destination.admin1}, <br />{" "}
                {destination.country}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Wrapper>
  );
};
export default Map;
