import React from "react";
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="container h-100">
      <div className="row h-100 d-flex justify-content-center align-items-center">
        <div className="col-12 text-center">
          <h1>Welcome to this React Application</h1>
          <p>
            <Link to="/login" className="btn btn-success me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-success">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
