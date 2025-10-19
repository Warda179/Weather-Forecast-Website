// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container-custom">
      {/* Full Width Header */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white rounded-2xl p-8 shadow-2xl mb-12">
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              WeatherForecast
            </h1>
            <p className="mt-4 text-blue-100/90 text-xl leading-relaxed max-w-2xl">
              Get accurate, real-time weather updates for any location worldwide. 
              Plan your day with confidence using our reliable forecasting.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link 
                to="/weather" 
                className="btn bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Explore Weather
              </Link>
              {!user && (
                <Link 
                  to="/register" 
                  className="btn border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-lg"
                >
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - All in One Row */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Better Planning
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to stay ahead of the weather with our comprehensive suite of tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🔍</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Instant Search</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Find weather for any city worldwide in seconds with real-time conditions, hourly forecasts, and extended outlooks.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">⭐</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Save Favorites</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Bookmark up to 6 cities for quick access. Your favorite locations are always one click away.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Mobile Friendly</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Access your weather information anywhere with our responsive design that works perfectly on all devices.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <span className="text-orange-600 text-xl">🌡️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Detailed Metrics</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Get comprehensive weather data including temperature, humidity, wind speed, pressure, and UV index.
            </p>
          </div>
        </div>
      </div>


      {/* Tip */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 max-w-2xl mx-auto">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5 flex-shrink-0">
            <span className="text-white text-sm">💡</span>
          </div>
          <div>
            <div className="font-semibold text-blue-900 mb-1">Pro Tip</div>
            <div className="text-sm text-blue-800">
              Use the search bar in the header to instantly jump to any city's weather forecast. 
              No need to navigate through multiple pages!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}