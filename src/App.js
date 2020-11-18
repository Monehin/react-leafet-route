import React, { useEffect, useState, forwardRef } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  GeoJSON,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

import data1 from './data/route1.json';
import data2 from './data/route2.json';
import data3 from './data/route3.json';

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
const MAPBOX_USERID = process.env.REACT_APP_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.REACT_APP_MAPBOX_STYLEID;

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.locate();
  });

  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function App() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;
    delete L.Icon.Default.prototype._getIconUrl;

    let DefaultIcon = L.icon({
      ...L.Icon.Default.prototype.options,
      iconUrl: icon,
      iconRetinaUrl: iconRetina,
      shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    const marker = L.marker([-1.968236, 30.102922]);
    marker.bindPopup('Marembo');
    marker.addTo(map);
  }, [map]);

  return (
    <MapContainer
      className='mapContainer'
      center={[-1.968236, 30.102922]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={setMap}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <GeoJSON
        data={data1}
        style={() => ({
          color: '#4a83ec',
          weight: 3,
          fillColor: '#1a1d62',
          fillOpacity: 1,
        })}
      />

      <GeoJSON
        data={data2}
        style={() => ({
          color: '#4a83ec',
          weight: 3,
          fillColor: '#1a1d62',
          fillOpacity: 1,
        })}
      />

      <GeoJSON
        data={data3}
        style={() => ({
          color: '#4a83ec',
          weight: 3,
          fillColor: '#1a1d62',
          fillOpacity: 1,
        })}
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default forwardRef(App);
