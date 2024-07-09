import React, { useState } from 'react';

const Payment = ({ selectedProperty, onComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleProcessPayment = async () => {
    if (selectedMethod) {
      try {
        // Simulate payment processing (replace with actual payment integration)
        const response = await fetch('http://localhost:5000/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: selectedProperty.id,
            paymentMethod: selectedMethod,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to process payment');
        }

        // Assuming backend confirms payment
        setPaymentStatus('success'); // Set payment status to success
        onComplete(true); // Notify parent component that payment is complete
      } catch (error) {
        console.error('Payment processing error:', error);
        setPaymentStatus('error'); // Set payment status to error
        onComplete(false); // Notify parent component that payment failed
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onComplete(false)}>&times;</span>
        <h2>Select Payment Method</h2>
        <p>You are purchasing: {selectedProperty.name}</p>
        
        {/* Payment Methods Section */}
        <div className="payment-methods">
          <button onClick={() => handlePaymentMethodSelect('Credit Card')}>
            Credit Card
          </button>
          <button onClick={() => handlePaymentMethodSelect('PayPal')}>
            PayPal
          </button>
          <button onClick={() => handlePaymentMethodSelect('M-Pesa')}>
            M-Pesa
          </button>
        </div>
        
        {/* Process Payment Button */}
        <div>
          <button onClick={handleProcessPayment} className="btn btn-primary">
            Process Payment
          </button>
        </div>

        {/* Payment Status Message */}
        {paymentStatus === 'success' && (
          <div className="alert alert-success mt-3" role="alert">
            Payment successful! Thank you for your purchase.
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="alert alert-danger mt-3" role="alert">
            Payment failed. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
