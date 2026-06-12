import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Fix for default marker icons in React-Leaflet
try {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
} catch (e) {
  console.warn("Leaflet icon hack failed", e);
}

// Component to dynamically update map center
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const MapComponent = ({ center, markers = [], radius = null, height = '400px', route = null, onMarkerClick = null }) => {
  
  // Custom marker icon to match Uber design
  const createCustomIcon = (type) => {
    return L.divIcon({
      className: 'custom-map-marker',
      html: `<div class="marker-circle ${type}"><div class="marker-inner"></div></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  return (
    <div className="map-wrapper" style={{ height }}>
      <MapContainer 
        center={center} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <ChangeView center={center} />
        {/* Using a light themed tile layer for contrast with dark sidebar */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw simulated route if provided */}
        {route && (
          <Polyline 
            positions={route} 
            color="#2ecc71" 
            weight={4} 
            opacity={0.8}
            lineCap="round"
            lineJoin="round"
          />
        )}
        
        {/* Draw radius if provided */}
        {radius && (
          <Circle 
            center={center} 
            radius={radius * 1000} 
            pathOptions={{ color: 'var(--accent-primary)', fillColor: 'var(--accent-primary)', fillOpacity: 0.1, weight: 1 }} 
          />
        )}

        {/* Draw markers */}
        {markers.map((marker, idx) => (
          <Marker 
            key={idx} 
            position={marker.position}
            icon={marker.iconType ? createCustomIcon(marker.iconType) : undefined}
            eventHandlers={{
              click: () => {
                if (onMarkerClick && marker.data) {
                  onMarkerClick(marker.data);
                }
              }
            }}
          >
            {marker.popup ? (
              <Popup className="dark-popup">
                <div className="custom-popup-content flex flex-col gap-sm">
                  <div className="flex items-center gap-md" style={{borderBottom: '1px solid #333', paddingBottom: '8px', marginBottom: '8px'}}>
                    <div className="avatar">{marker.data?.name?.charAt(0) || 'D'}</div>
                    <div>
                      <h4 style={{margin: 0, color: '#fff'}}>{marker.data?.name || marker.popup}</h4>
                      <p style={{margin: 0, color: '#aaa', fontSize: '0.8rem'}}>{marker.data?.car || 'VW Passat'}</p>
                    </div>
                  </div>
                  {marker.data && (
                    <div style={{fontSize: '0.85rem', color: '#ccc'}}>
                      <p style={{margin: '4px 0'}}><strong>📞 Phone:</strong> <a href={`tel:${marker.data.phone}`} style={{color: 'var(--accent-green)'}}>{marker.data.phone}</a></p>
                      <p style={{margin: '4px 0'}}><strong>⭐ Rating:</strong> {marker.data.rating} ({marker.data.reviews} reviews)</p>
                      <p style={{margin: '4px 0', fontStyle: 'italic', color: '#aaa'}}>"{marker.data.comment}"</p>
                    </div>
                  )}
                </div>
              </Popup>
            ) : marker.title ? (
              <Popup>
                <strong>{marker.title}</strong>
                {marker.description && <p>{marker.description}</p>}
                {marker.action && (
                  <button className="btn-primary mt-sm w-full" onClick={marker.action.onClick}>
                    {marker.action.label}
                  </button>
                )}
              </Popup>
            ) : null}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
