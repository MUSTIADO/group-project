import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Contact.css'; // Import the custom CSS file

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // State for success message
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Effect to handle redirection after showing success message
  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        navigate('/'); // Redirect to Home page after 2 seconds
      }, 2000); // Adjust timing as needed
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <Formik
        initialValues={{ username: '', email: '', message: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          message: Yup.string().required('Message is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setIsSubmitted(true); // Set submitted state to true
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form as={BootstrapForm} className="contact-form">
            <BootstrapForm.Group>
              <BootstrapForm.Label>Username</BootstrapForm.Label>
              <Field
                className="form-control"
                name="username"
                type="text"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group>
              <BootstrapForm.Label>Email Address</BootstrapForm.Label>
              <Field
                className="form-control"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group>
              <BootstrapForm.Label>Message</BootstrapForm.Label>
              <Field
                className="form-control"
                name="message"
                as="textarea"
                rows="4"
                placeholder="Enter your message"
              />
              <ErrorMessage name="message" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <Button
              variant="primary"
              type="submit"
              className="contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Success Message */}
      {isSubmitted && (
        <Alert variant="success" className="mt-3">
          Success! Message sent.
        </Alert>
      )}
    </div>
  );
};

export default Contact;
