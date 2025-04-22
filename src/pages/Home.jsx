// src/pages/Home.js
import App from '../App';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>
      {/* Messages list, Add Message component goes here */}
      <App></App>
    </div>
  );
};

export default Home;
