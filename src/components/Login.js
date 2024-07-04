// AuthForm.js (combined login and signup form)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css'; // Import the CSS file for styling

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Login = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  return (
    <div className="login">
      <div className="form">
        <span>{showSignupForm ? 'Sign Up' : 'Login'}</span>
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
          }}
          validationSchema={showSignupForm ? SignupSchema : LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Common form fields */}
              <div>
                <Field type="email" name="email" placeholder="Email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              {showSignupForm && (
                <div>
                  <Field type="text" name="username" placeholder="Username" className="form-control" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>
              )}
              <div>
                <Field type="password" name="password" placeholder="Password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              {showSignupForm && (
                <div>
                  <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </div>
              )}
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {showSignupForm ? 'Sign Up' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        {!showSignupForm ? (
          <p>
            Don't have an account?{' '}
            <Link to="#" onClick={handleSignupClick}>
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to="#" onClick={() => setShowSignupForm(false)}>
              Log In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
