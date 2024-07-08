import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Property.css';

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
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
      setShowPaymentMethods(true);
    } else {
      // Redirect to login page if not logged in
      navigate('/login');
    }
  };

  const handlePaymentMethodSelect = async (method) => {
    try {
      // Simulate payment processing (replace with actual payment integration)
      const response = await fetch('http://localhost:5000/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: selectedProperty.id,
          paymentMethod: method,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      // Assuming backend confirms payment
      setPaymentComplete(true);
    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentMethods(false);
    setSelectedProperty(null); // Reset selected property
    setPaymentComplete(false); // Reset payment complete status
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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handlePaymentClose}>&times;</span>
            {!paymentComplete ? (
              <>
                <h2>Select Payment Method</h2>
                <p>You are purchasing: {selectedProperty.name}</p>
                <button onClick={() => handlePaymentMethodSelect('Credit Card')}>
                  Credit Card
                </button>
                <button onClick={() => handlePaymentMethodSelect('PayPal')}>
                  PayPal
                </button>
                <button onClick={() => handlePaymentMethodSelect('M-Pesa')}>
                  M-Pesa
                </button>
                {/* Add more payment methods as needed */}
              </>
            ) : (
              <>
                <h2>Payment Successful!</h2>
                <p>Thank you for purchasing {selectedProperty.name}.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
