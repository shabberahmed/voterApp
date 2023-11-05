import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSuccessfulLogin = (token:string) => {
    // Store the user token in local storage or use it as needed
    localStorage.setItem('userToken', token);

    // You can also perform other actions after a successful login, such as redirecting the user.
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();


    try {
      console.log('hello')

      const response = await axios.post('http://localhost:1001/admin/login', formData);
      const token = response.data.token; // Assuming your server returns a token upon successful login
      console.log(response.data);
      localStorage.setItem("username",response.data.name)
      localStorage.setItem("id",response.data.id)
      handleSuccessfulLogin(token);
      if(response.data.role=="admin"){
        navigate('/admin/page')
      }
      else{
        navigate('/home')


      }
    } catch (error:any) {
      setError(error.response.data.m); // Using "error.response.data.m" for the error message
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
     <div style={{width:"55%"}}>
     <form >
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSubmit} className="btn bg-blue-400">
          Login
        </button>
      </form>
     </div>
    </div>
  );
};

export default UserLogin;
