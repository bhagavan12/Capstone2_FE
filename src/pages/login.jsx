// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate,NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const { login } = useAuth(); // ✅ using useAuth instead of context directly
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
//       login(res.data);
//       navigate('/');
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input name="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
//       <button type="submit">Login</button>
//       <NavLink to='/register'>SignUp</NavLink>
//     </form>
//   );
// };

// export default Login;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock } from 'lucide-react';
import './styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      login(res.data);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Shield className="auth-logo" />
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>
        <form onSubmit={handleLogin} className="auth-form">
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
          <button type="submit" className="auth-button">Login</button>
          <p className="auth-link">
            Don't have an account? <NavLink to='/register'>Sign Up</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;