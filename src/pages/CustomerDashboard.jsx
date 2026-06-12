import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, MapPin, Star, LogOut, Navigation, MessageSquare } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import { getNearbyDrivers } from '../services/mockData';
import './CustomerDashboard.css';

// ── Translations ──────────────────────────────────────
const T = {
  en: {
    brand: 'RideSync',
    logout: 'Logout',
    meetingPoint: 'Meeting Point',
    useCurrentLocation: 'Use Current Location',
    searchLocation: 'Search Location...',
    searchRadius: 'Search Radius',
    availableDrivers: (n) => `Available Drivers (${n})`,
    kmAway: (d) => `${d} km away`,
    bookDriver: 'Book Driver',
    noDrivers: (r) => `No drivers found within ${r}km.`,
    scanning: (r) => `Scanning ${r}km Radius...`,
    selectedDriver: 'Selected Driver',
    vehicle: 'Vehicle',
    latestReview: 'Latest Review',
    reviews: (n) => `${n} reviews`,
    clickHint: 'Click a green driver marker on the map to view their profile, ratings, and reviews.',
    langBtn: 'தமிழ்',
  },
  ta: {
    brand: 'ரைட்சிங்க்',
    logout: 'வெளியேறு',
    meetingPoint: 'சந்திப்பு இடம்',
    useCurrentLocation: 'தற்போதைய இடத்தை பயன்படுத்து',
    searchLocation: 'இடத்தை தேடு...',
    searchRadius: 'தேடல் ஆரம்',
    availableDrivers: (n) => `கிடைக்கும் ஓட்டுனர்கள் (${n})`,
    kmAway: (d) => `${d} கி.மீ தொலைவு`,
    bookDriver: 'ஓட்டுனரை பதிவு செய்',
    noDrivers: (r) => `${r} கி.மீ. உள்ளே ஓட்டுனர்கள் இல்லை.`,
    scanning: (r) => `${r} கி.மீ ஆரம் ஸ்கேன் செய்கிறது...`,
    selectedDriver: 'தேர்ந்தெடுக்கப்பட்ட ஓட்டுனர்',
    vehicle: 'வாகனம்',
    latestReview: 'சமீபத்திய மதிப்பீடு',
    reviews: (n) => `${n} மதிப்புரைகள்`,
    clickHint: 'ஓட்டுனரின் விவரங்கள், மதிப்பீடுகள் மற்றும் மதிப்புரைகளை காண பச்சை மார்க்கரை கிளிக் செய்யவும்.',
    langBtn: 'English',
  },
};

const CustomerDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const t = T[lang];

  const handleLogout = () => {
    if (setUser) setUser(null);
    navigate('/');
  };

  const toggleLang = () => setLang(l => l === 'en' ? 'ta' : 'en');

  const [radius, setRadius] = useState(4);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const userLocation = [40.7128, -74.0060];

  useEffect(() => {
    const drivers = getNearbyDrivers(userLocation, radius);
    setNearbyDrivers(drivers);
    if (selectedDriver && !drivers.find(d => d.id === selectedDriver.id)) {
      setSelectedDriver(null);
    }
  }, [radius]);

  const markers = [
    { position: userLocation, iconType: 'home' },
    ...nearbyDrivers.map(d => ({
      position: d.location,
      iconType: 'pin',
      popup: 'Click for details',
      data: d
    }))
  ];

  return (
    <div className="uber-layout">
      {/* Sidebar */}
      <aside className="uber-sidebar" style={{ width: '420px', padding: '24px', overflowY: 'auto' }}>

        {/* Header */}
        <div className="sidebar-header flex justify-between items-center" style={{ marginBottom: '24px' }}>
          <div className="brand flex items-center gap-sm">
            <div className="brand-logo"></div>
            <h2>{t.brand}</h2>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            title="Switch Language"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(46,204,113,0.12)',
              border: '1px solid rgba(46,204,113,0.3)',
              color: '#2ecc71',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(46,204,113,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(46,204,113,0.12)'; }}
          >
            🌐 {t.langBtn}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.22)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#f87171'; }}
          >
            <LogOut size={14} /> {t.logout}
          </button>
        </div>

        {/* Meeting Point */}
        <div className="location-actions" style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>{t.meetingPoint}</h3>
          <div className="flex flex-col gap-md">
            <button className="location-btn current-location">
              <MapPin size={16} /> {t.useCurrentLocation}
            </button>
            <button className="location-btn search-location">
              <Settings size={16} /> {t.searchLocation}
            </button>
          </div>
        </div>

        {/* Search Radius */}
        <div className="search-radius" style={{ marginBottom: '28px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{t.searchRadius}</h3>
            <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{radius} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="radius-slider"
          />
        </div>

        {/* Nearby Drivers Grid */}
        <div className="driver-list-container">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>{t.availableDrivers(nearbyDrivers.length)}</h3>

          <div className="driver-grid">
            {nearbyDrivers.length > 0 ? nearbyDrivers.map(driver => (
              <div
                key={driver.id}
                className={`driver-card ${selectedDriver?.id === driver.id ? 'selected' : ''}`}
                onClick={() => setSelectedDriver(driver)}
              >
                <div className="driver-card-header flex justify-between items-start">
                  <div className="flex flex-col gap-sm">
                    <div className="avatar" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>{driver.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{driver.car}</p>
                    </div>
                  </div>
                  <div className="text-left mt-xs">
                    <div className="flex items-center gap-xs" style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600 }}>
                      <Star size={14} fill="#f59e0b" /> {driver.rating}
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{t.kmAway(driver.distance)}</p>
                  </div>
                </div>

                <div className="driver-card-action mt-md">
                  <button className="book-btn w-full" onClick={(e) => { e.stopPropagation(); alert(`Booking ${driver.name}!`); }}>
                    {t.bookDriver}
                  </button>
                </div>
              </div>
            )) : (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px 0', fontStyle: 'italic', gridColumn: '1/-1' }}>
                {t.noDrivers(radius)}
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Map */}
      <main className="uber-main relative">
        <MapComponent
          center={userLocation}
          markers={markers}
          radius={radius}
          height="100%"
          onMarkerClick={(driver) => setSelectedDriver(driver)}
        />

        {/* Floating Bottom Card */}
        <div className="floating-status-card">
          <div className="card-header flex justify-between items-center">
            <h3>{selectedDriver ? t.selectedDriver : t.scanning(radius)}</h3>
            <span className="close-btn" onClick={() => setSelectedDriver(null)}>×</span>
          </div>

          <div className="card-body">
            {selectedDriver ? (
              <>
                <div className="detail-item">
                  <Star size={16} className="detail-icon" style={{ color: '#f59e0b' }} />
                  <div>
                    <p className="detail-label">{selectedDriver.name}</p>
                    <p className="detail-value">{selectedDriver.rating} ({t.reviews(selectedDriver.reviews)})</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Navigation size={16} className="detail-icon" />
                  <div>
                    <p className="detail-label">{t.vehicle}</p>
                    <p className="detail-value">{selectedDriver.car}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <MessageSquare size={16} className="detail-icon" />
                  <div>
                    <p className="detail-label">{t.latestReview}</p>
                    <p className="detail-value" style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>"{selectedDriver.comment}"</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full" style={{ padding: '12px 0' }}>
                <p style={{ color: '#888', fontStyle: 'italic' }}>{t.clickHint}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
