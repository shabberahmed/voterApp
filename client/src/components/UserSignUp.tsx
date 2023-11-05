import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import SanjayImage from './Sanjay.jpg';
import backgroundImage from "./background.jpg";
import logo from './Bjplogo.png';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulating a loading time of 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1001/user/signup', formData);
      console.log(response.data);
      // You can redirect the user to a success page or do other actions here.
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response && axiosError.response.data) {
          setError(axiosError.response.data.message);
        } else {
          setError('An error occurred during the signup process. Please try again later.');
        }
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <h1 style={{ fontSize: '1.2em' }}>Loading...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${SanjayImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "90%", maxWidth: 300, backgroundColor: "rgba(255, 255, 255, 0.8)", padding: 15, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
        <img src={logo} alt="logo" style={{ marginBottom: 15, width: '100%', borderRadius: 5 }} />
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger" style={{ fontSize: '1.2em' }}>{error}</div>}
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ fontSize: '1.2em', padding: 10, marginBottom: 10, borderRadius: 5 }}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ fontSize: '1.2em', padding: 10, marginBottom: 10, borderRadius: 5 }}
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ fontSize: '1.2em', padding: 10, marginBottom: 10, borderRadius: 5 }}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              style={{ fontSize: '1.2em', padding: 10, marginBottom: 10, borderRadius: 5 }}
            />
          </div>
          <button type="submit" className="btn bg-blue-400" style={{ width: '100%', fontSize: '1.2em', padding: 10, borderRadius: 5 }}>
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: 10, textAlign: "center", fontSize: '1.2em' }}>
          Already a member? <a href="/">Login</a>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
