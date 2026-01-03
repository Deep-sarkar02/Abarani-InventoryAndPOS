import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import POS from './pages/POS';
import UserManagement from './pages/UserManagement';
import Protected from './components/Protected';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* Admin Only Routes */}
              <Route element={<Protected adminOnly={true} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
              </Route>

              {/* Admin & User Routes */}
              <Route element={<Protected />}>
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/pos" element={<POS />} />
              </Route>

              {/* Public Support Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/contact-us" element={<ContactUs />} />

              {/* Redirect root to login */}
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
