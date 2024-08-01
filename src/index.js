import './index.css';
import 'boxicons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ChatProvider>
        <Router>
          <App />
        </Router>
        </ChatProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
