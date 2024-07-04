import React, { useState, useEffect } from 'react';
import './Property.css'; // Import CSS file

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const propertyIDs = ['4937770', '4937771', '4937772']; // Example list of property IDs
        const promises = propertyIDs.map(id => {
          const url = `https://bayut.p.rapidapi.com/properties/detail?externalID=${id}`;
          return fetch(url, {
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': 'bayut.p.rapidapi.com'
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch property ${id}`);
            }
            return response.json();
          });
        });

        const propertyData = await Promise.all(promises);
        setProperties(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (properties.length === 0) return <p>No properties found.</p>;

  return (
    <div className="container">
      <h1>Properties</h1>
      <div className="row">
        {properties.map(property => (
          <div key={property.externalID} className="col-md-4 mb-3">
            <div className="card">
              <img src={property.coverPhoto.url} className="card-img-top" alt={property.title} />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p><strong>Price:</strong> {property.price} </p>
                <p><strong>Location:</strong> {property.location.map(loc => loc.name).join(', ')}</p>
                <a href={`/property/${property.externalID}`} className="btn btn-primary">View Property</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
