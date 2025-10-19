// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-white/60">
      <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <div>© {new Date().getFullYear()} WeatherSite</div>
        <div className="flex gap-4">

        </div>
      </div>
    </footer>
  );
}
