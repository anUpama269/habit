import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Habitform from './components/Habitform';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [islogin, settoken] = useState(false);

  function checkloginstatus() {
    let token = localStorage.getItem('token');
    settoken(!!token);
  }

  useEffect(() => {
    checkloginstatus();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar islogin={islogin} onlogout={checkloginstatus}/>
      <Routes>
        <Route path="/" element={<Navigate to={islogin ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login onlogin={checkloginstatus} />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={islogin ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-habit" element={islogin ? <Habitform/> : <Navigate to="/login" />} />
        <Route path="/analytics" element={islogin ? <Analytics/> : <Navigate to="/login" />} />
        <Route path="/profile" element={islogin ? <Profile/> : <Navigate to="/login" />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
