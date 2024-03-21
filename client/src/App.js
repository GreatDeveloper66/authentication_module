import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginRegistrationPage from './pages/LoginRegistrationPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegistrationPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
  );
}

export default App;