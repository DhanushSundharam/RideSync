import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import { Power, PowerOff, CheckCircle, XCircle } from 'lucide-react';
import './Dashboard.css';

const DriverDashboard = ({ user }) => {
  const [isOnline, setIsOnline] = useState(user?.status === 'online');
  const [requests, setRequests] = useState([
    { id: 'req1', customer: 'John Doe', pickup: '123 Main St', dropoff: '456 Market St', distance: '1.2 km', price: '$25' },
    { id: 'req2', customer: 'Alice Smith', pickup: '789 Broad Ave', dropoff: '101 Tech Blvd', distance: '3.5 km', price: '$40' }
  ]);
  const [activeTrip, setActiveTrip] = useState(null);

  const toggleStatus = () => setIsOnline(!isOnline);

  const acceptRequest = (req) => {
    setActiveTrip(req);
    setRequests(requests.filter(r => r.id !== req.id));
  };

  const rejectRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const completeTrip = () => {
    setActiveTrip(null);
  };

  return (
    <div className="dashboard-container container">
      <header className="dashboard-header flex justify-between items-center">
        <div>
          <h1>Driver Dashboard</h1>
          <p>Manage your availability and ride requests.</p>
        </div>
        <button 
          className={`btn-primary flex items-center gap-sm`} 
          onClick={toggleStatus}
          style={{ backgroundColor: isOnline ? 'var(--danger)' : 'var(--success)', color: '#fff', boxShadow: 'none' }}
        >
          {isOnline ? <PowerOff size={18} /> : <Power size={18} />}
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-sidebar">
          {activeTrip ? (
             <div className="glass-card" style={{ borderColor: 'var(--accent-primary)' }}>
               <h3>Active Trip</h3>
               <div className="mt-md">
                 <p className="text-secondary">Passenger</p>
                 <p style={{fontSize: '1.2rem', fontWeight: 600}}>{activeTrip.customer}</p>
                 
                 <p className="text-secondary mt-md">Pickup</p>
                 <p>{activeTrip.pickup}</p>

                 <p className="text-secondary mt-md">Dropoff</p>
                 <p>{activeTrip.dropoff}</p>
                 
                 <button className="btn-primary w-full mt-lg" onClick={completeTrip}>
                   Complete Trip
                 </button>
               </div>
             </div>
          ) : (
            <div className="glass-card">
              <h3>Incoming Requests {isOnline && requests.length > 0 && `(${requests.length})`}</h3>
              {!isOnline ? (
                <p className="text-muted mt-md">You are offline. Go online to receive requests.</p>
              ) : requests.length === 0 ? (
                <p className="text-muted mt-md">Searching for nearby rides...</p>
              ) : (
                <div className="list-container mt-md">
                  {requests.map(req => (
                    <div key={req.id} className="list-item" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                      <div className="w-full flex justify-between">
                        <strong>{req.customer}</strong>
                        <span style={{color: 'var(--accent-primary)'}}>{req.price}</span>
                      </div>
                      <p className="text-secondary mt-sm" style={{fontSize: '0.85rem'}}>{req.distance} away</p>
                      <div className="flex gap-sm mt-md w-full">
                        <button className="btn-secondary w-full" onClick={() => rejectRequest(req.id)}>Reject</button>
                        <button className="btn-primary w-full" onClick={() => acceptRequest(req)}>Accept</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="dashboard-main">
          {/* Mocking current driver location */}
          <MapComponent 
            center={user.location || [40.7138, -74.0050]} 
            markers={[{ position: user.location || [40.7138, -74.0050], title: 'You', iconType: 'home' }]} 
            height="600px" 
          />
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
