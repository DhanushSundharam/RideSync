export const MOCK_USERS = {
  customer1: { id: 'c1', name: 'Alice Smith', role: 'customer', location: [40.7128, -74.0060] },
  driver1: { 
    id: 'd1', 
    name: 'Bill Harness', 
    role: 'driver', 
    status: 'online', 
    location: [40.7138, -74.0050], 
    rating: 4.9,
    car: 'VW Passat',
    phone: '+1 (555) 123-4567',
    reviews: 124,
    comment: 'Great driver, arrived early and car was spotless!'
  },
  driver2: { 
    id: 'd2', 
    name: 'Charlie Wheel', 
    role: 'driver', 
    status: 'online', 
    location: [40.7108, -74.0070], 
    rating: 4.7,
    car: 'Toyota Camry',
    phone: '+1 (555) 987-6543',
    reviews: 89,
    comment: 'Smooth ride, knew all the shortcuts.'
  },
  driver3: { 
    id: 'd3', 
    name: 'Dave Road', 
    role: 'driver', 
    status: 'offline', 
    location: [40.7158, -74.0020], 
    rating: 4.5,
    car: 'Honda Accord',
    phone: '+1 (555) 555-5555',
    reviews: 45,
    comment: 'Friendly guy, but took the long way.'
  },
  driver4: { 
    id: 'd4', 
    name: 'Sarah Miles', 
    role: 'driver', 
    status: 'online', 
    location: [40.7300, -73.9900], // Further away (~2.5km)
    rating: 4.6,
    car: 'Tesla Model 3',
    phone: '+1 (555) 222-3333',
    reviews: 210,
    comment: 'Quiet ride, nice car.'
  },
  driver5: { 
    id: 'd5', 
    name: 'Tom Cruise', 
    role: 'driver', 
    status: 'online', 
    location: [40.7500, -73.9800], // Even further (~4.6km)
    rating: 5.0,
    car: 'Mercedes S-Class',
    phone: '+1 (555) 999-8888',
    reviews: 500,
    comment: 'Felt like a movie star.'
  },
  driver6: { 
    id: 'd6', 
    name: 'Lucy Lane', 
    role: 'driver', 
    status: 'online', 
    location: [40.7800, -73.9500], // Very far (~8km)
    rating: 4.8,
    car: 'Audi A6',
    phone: '+1 (555) 777-6666',
    reviews: 150,
    comment: 'Very professional.'
  },
  admin1: { id: 'a1', name: 'Eve Admin', role: 'admin' },
};

// Haversine formula to calculate distance in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
};

export const getNearbyDrivers = (customerLocation, radiusKm = 4) => {
  return Object.values(MOCK_USERS)
    .filter(u => u.role === 'driver' && u.status === 'online')
    .map(driver => {
      const distance = getDistance(customerLocation[0], customerLocation[1], driver.location[0], driver.location[1]);
      return { ...driver, distance: parseFloat(distance.toFixed(1)) };
    })
    .filter(driver => driver.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
};
