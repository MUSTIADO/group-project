import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetail = () => {
  const { id } = useParams(); // Accessing the id parameter from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://bayut.p.rapidapi.com/properties/detail?externalID=${id}`;
        const response = await fetch(url, {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'bayut.p.rapidapi.com'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch property ${id}`);
        }

        const propertyData = await response.json();
        setProperty(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPropertyDetail();
  }, [id]); // Dependency array ensures fetch is triggered when id changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="container">
      <h2>{property.title}</h2>
      <div className="card">
        <img src={property.coverPhoto.url} className="card-img-top" alt={property.title} />
        <div className="card-body">
          <h5 className="card-title">{property.title}</h5>
          <p className="card-text">{property.description}</p>
          <p><strong>Price:</strong> {property.price} USD</p>
          <p><strong>Location:</strong> {property.location.map(loc => loc.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
