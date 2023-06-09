import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/Task" element={<SignUp />} />
        <Route path="/Task" element={<SignUp />} />
        <Route path="/Task/login" element={<Login />} />
        <Route exact path="/Task/login" element={<Login />} />
        <Route path="Task/dashboard" element={<Dashboard />} />
        <Route exact path="/Task/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
