
import './App.css';
import ChatApp from './components/chatApp';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
       
      <div className="App">
        <Routes>
          <Route   path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
