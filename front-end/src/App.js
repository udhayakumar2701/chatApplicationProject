
import { useState,useEffect } from 'react';
import './App.css';
import ChatApp from './components/chatApp';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  Navigate } from 'react-router-dom';

function App() {

  const[authentication,setAuthentication]=useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('authentication');
    if (storedAuth) {
      setAuthentication(storedAuth);
    }
  }, []);

  const handleAuthentication=(userId)=>{
    localStorage.setItem('authentication', userId);
    setAuthentication(userId);
    
  }
  return (
    <Router>
       
      <div className="App">
        <Routes>
          {/*  element={authentication ? <home /> : <Navigate to="/" replace />} this line is used to protect the page .*/}
          <Route   path="/home" element={authentication ? <Home /> : <Navigate to="/" replace />} />
          <Route path="/" element={<Login handleAuth={handleAuthentication} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={authentication ?<ChatApp />:<Navigate to='/' replace/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
