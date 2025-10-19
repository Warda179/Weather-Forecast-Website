// src/components/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const { user, logout, login, register } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-slate-900 text-white/90 backdrop-blur-sm border-b border-slate-700">
      <div className="container-custom flex items-center justify-between gap-4 py-3">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-sm">
            W
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-lg font-semibold">WeatherSite</span>
            <span className="text-xs text-slate-400">Fast forecasts</span>
          </div>
        </Link>

        {/* Center: Nav links */}
        <div className="flex items-center gap-4 justify-center flex-1">
          <Link to="/" className="text-sm hover:text-white font-medium">Home</Link>
          <Link to="/weather" className="text-sm hover:text-white font-medium">Weather</Link>
        </div>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <button
                onClick={login}
                className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={register}
                className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium"
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium">Search city</button>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium"
              >
                Logout
              </button>
              <div className="flex items-center gap-2">
                <img
                  src={`https://avatars.dicebear.com/api/initials/${encodeURIComponent(user.email ?? '')}.svg`}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
                <div className="hidden sm:flex flex-col text-sm">
                  <span className="font-medium">{user?.email ? user.email.split('@')[0] : 'Guest'}</span>
                  <span className="text-xs text-slate-400">Member</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
