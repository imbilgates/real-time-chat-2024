import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';
import { store } from './store/store';
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
      <ChatProvider>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ChatProvider>
    </UserProvider>
);
