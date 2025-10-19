// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return setError('Please enter an email.');
    setError('');
    register({ email });
    navigate('/weather');
  }

  return (
    <div className="container-custom max-w-md mx-auto mt-20">
      <div className="card p-10">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="text-sm text-slate-500">Sign up to save cities and personalize your experience.</p>
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
            <input type="password" value={password} readOnly placeholder="Choose a password (demo)" className="input bg-slate-50" />
            <div className="text-xs text-slate-400 mt-1"></div>
          </label>

          <button type="submit" className="btn btn-primary w-full">Create account</button>

          <div className="text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-emerald-600 font-medium">Sign in</Link>
          </div>
        </form>
      </div>
      <div className="mt-6 text-center text-xs text-slate-400"></div>
    </div>
  );
}
