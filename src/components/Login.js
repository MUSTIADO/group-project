import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const logInUser = () => {
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Assuming this logs { email: 'mustimaalim6@gmail.com', id: 'b48e9ab7e7d24b1e91a93d4e22df6e06' }
        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false); // Reset login success message after some time
          navigate("/");
        }, 3000); // Reset after 3 seconds (adjust as needed)
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.message.includes("401")) {
          alert("Invalid credentials. Please check your email and password.");
        } else {
          alert("Login failed. Please try again later.");
        }
      });
  };

  let imgs = [
    'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
  ];

  return (
    <div>
      <div className="container h-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={imgs[0]} className="img-fluid" alt="Login Page" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={logInUser}
                  >
                    Login
                  </button>
                  {loginSuccess && (
                    <div className="alert alert-success mt-3" role="alert">
                      Login Successful! Redirecting...
                    </div>
                  )}
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
