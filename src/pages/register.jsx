// // src/pages/Register.js
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'lucide-react';
// import { NavLink } from 'react-router-dom';
// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', formData);
//       alert('Registration successful');
//       navigate('/login');
//     } catch (err) {
//       console.log(err.message);
//       alert('Registration failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input name="name" placeholder="Username" onChange={handleChange} required />
//       <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
//       <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
//       <button type="submit">Register</button>
//       <NavLink to='/'>Signin</NavLink>
//     </form>
//   );
// };

// export default Register;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { Shield, User, Mail, Lock } from 'lucide-react';
import './styles/Login.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://capstone2-be.onrender.com/api/auth/register', formData);
      alert('Registration successful');
      navigate('/');
    } catch (err) {
      console.log(err.message);
      alert('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Shield className="auth-logo" />
          <h2>Create Account</h2>
          <p>Join our secure messaging platform</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <User size={20} />
            <input 
              name="name" 
              placeholder="Username" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <Mail size={20} />
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <Lock size={20} />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="auth-button">Register</button>
          <p className="auth-link">
            Already have an account? <NavLink to='/'>Sign In</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;