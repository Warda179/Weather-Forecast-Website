// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return setError('Please enter your email.');
    setError('');
    login({ email });
    navigate('/weather');
  }

  return (
    <div className="container-custom max-w-md mx-auto mt-20">
      <div className="card p-10">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-sm text-slate-500">Sign in to access your saved cities and forecasts.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}
          <label className="block">
            <div className="text-xs text-slate-600 mb-1">Email</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" className="input" />
          </label>

          <label className="block">
            <div className="text-xs text-slate-600 mb-1">Password</div>
            <input type="password" value={password} readOnly placeholder="Password" className="input bg-slate-50" />
            <div className="text-xs text-slate-400 mt-1"></div>
          </label>

          <button type="submit" className="btn btn-primary w-full">Login</button>

          <div className="text-center text-sm text-slate-500">
            Don’t have an account? <Link to="/register" className="text-brand-600 font-medium">Create one</Link>
          </div>
        </form>
      </div>
      <div className="mt-6 text-center text-xs text-slate-400">By continuing you agree to our terms and privacy policy.</div>
    </div>
  );
}
