// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import {useAuth } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Register from "./pages/register";
// import Home from "./pages/Home";
// import PrivateRoute from "./components/PrivateRoute";
// import Hmsg from "./pages/Hmsg";
// function App() {
//   const { user } = useAuth();

//   return (
//       <Router>
//         <Routes>
//           <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
//           <Route path="/hmsg" element={<PrivateRoute><Hmsg /></PrivateRoute>} />
//           <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
//           <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
//         </Routes>
//       </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import Hmsg from './pages/Hmsg';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import App1 from './App';
import LandingPage from './pages/LandingPage';
function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/new-msg"
          element={
            <PrivateRoute>
              <Layout>
                <App1 />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/hmsg"
          element={
            <PrivateRoute>
              <Layout>
                <Hmsg />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/hmsg" />} />
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/hmsg" />} />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/hmsg" />}
        />
      </Routes>
    </Router>
  );
}

export default App;