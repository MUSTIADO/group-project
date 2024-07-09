// Payment.js
import React, { useState } from 'react';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      setProcessing(true);
      // Simulate payment processing (replace with actual payment logic)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2 second delay

      // Assuming payment succeeds in this example
      console.log('Payment successful!');
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container">
      <h1>Payment Page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YYYY"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={processing}>
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default Payment;
