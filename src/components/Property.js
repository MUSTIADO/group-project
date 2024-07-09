import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Property.css';
import Payment from './Payment'; // Import Payment component

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/properties');
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.statusText}`);
        }
        const propertyData = await response.json();
        setProperties(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Simulated check for login status (replace with actual authentication logic)
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleBuyClick = (property) => {
    if (isLoggedIn) {
      setSelectedProperty(property);
      // Navigate to the payment section for the selected property
      navigate(`/property/${property.id}/payment`);
    } else {
      // Redirect to the payment page if not logged in
      navigate('/payment');
    }
  };

  const handlePaymentComplete = (success) => {
    if (success) {
      setPaymentComplete(true);
    }
    setShowPaymentMethods(false);
    setSelectedProperty(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (properties.length === 0) return <p>No properties found.</p>;

  return (
    <div className="container">
      <h1>Properties</h1>
      <div className="row">
        {properties.map(property => (
          <div key={property.id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={`http://localhost:5000/images/${property.imageUrl}`}
                className="card-img-top"
                alt={property.name}
              />
              <div className="card-body">
                <h5 className="card-title">{property.name}</h5>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                <button
                  onClick={() => handleBuyClick(property)}
                  className="btn btn-primary"
                >
                  Buy Property
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Payment Methods Modal */}
      {showPaymentMethods && (
        <Payment
          selectedProperty={selectedProperty}
          onComplete={handlePaymentComplete}
        />
      )}

      {/* Optional: Show payment success message */}
      {paymentComplete && (
        <div className="alert alert-success mt-3" role="alert">
          Payment successful! Thank you for your purchase.
        </div>
      )}
    </div>
  );
};

export default Property;
