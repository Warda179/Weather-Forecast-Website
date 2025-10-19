// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import WeatherApp from './components/WeatherApp';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-subtle-50 flex flex-col">
          {/* Nav must be here so Login/Register links show */}
          <Nav />

          {/* main content */}
          <main className="container-custom flex-1 py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/weather"
                element={
                  <ProtectedRoute>
                    <WeatherApp />
                  </ProtectedRoute>
                }
              />
              {/* fallback route (optional) */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
