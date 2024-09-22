import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { useContext } from 'react';
import { UserContext } from './context/UserContext'
import ProtectRoute from './ProtectRoute/ProtectRoute'
import Auth from './componant/auth/Auth'

function App() {
  const { user, loading } = useContext(UserContext);
  if (loading) return;
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={!user ? <Auth /> : <Navigate to="/home" />}></Route>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
