// src/components/WeatherApp.jsx
import React, { useState, useEffect } from 'react';

const API_KEY = "bcb6962d9aa1230597ad5f9a41809cb9"; // Your API key
const kToC = (k) => Math.round(k - 273.15);
const formatDate = (dtTxt) => {
  const d = new Date(dtTxt);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function WeatherApp() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedCities') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    const last = localStorage.getItem('lastCity');
    if (last) fetchWeather(last);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCities', JSON.stringify(saved));
  }, [saved]);

  async function fetchWeather(cityName) {
    if (!API_KEY) {
      setError('Missing API key.');
      return;
    }
    setLoading(true);
    setError(null);
    setCurrent(null);
    setForecast([]);
    setCity(null);

    try {
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      if (!geoData || geoData.length === 0) throw new Error('City not found');
      const { lat, lon, name, country, state } = geoData[0];
      setCity({ name, country, state, lat, lon });
      localStorage.setItem('lastCity', cityName);

      const curRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const curData = await curRes.json();
      if (curData?.cod && Number(curData.cod) !== 200) throw new Error(curData.message || 'Failed to load');
      setCurrent(curData);

      const fRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const fData = await fRes.json();
      if (fData?.cod && Number(fData.cod) !== 200) throw new Error(fData.message || 'Failed to load forecast');

      const byDate = {};
      (fData.list || []).forEach((entry) => {
        const dateKey = entry.dt_txt.split(' ')[0];
        if (!byDate[dateKey]) byDate[dateKey] = [];
        byDate[dateKey].push(entry);
      });

      const daily = Object.keys(byDate).slice(0, 5).map((dateKey) => {
        const items = byDate[dateKey];
        const midday = items.find((it) => it.dt_txt.includes('12:00:00')) || items[0];
        const temps = items.map((it) => it.main.temp);
        const min = Math.min(...temps);
        const max = Math.max(...temps);
        return {
          date: dateKey,
          label: formatDate(items[0].dt_txt),
          icon: midday?.weather?.[0]?.icon || '01d',
          description: midday?.weather?.[0]?.main || 'Clear',
          temp_min: kToC(min),
          temp_max: kToC(max),
        };
      });

      setForecast(daily);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed fetching weather');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e?.preventDefault();
    if (!query) return;
    fetchWeather(query.trim());
    setQuery('');
  }

  function useMyLocation() {
    if (!navigator.geolocation) return setError('Geolocation not supported');
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;
      try {
        const rev = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
        const revData = await rev.json();
        const place = revData?.[0]?.name || `${lat.toFixed(2)},${lon.toFixed(2)}`;
        fetchWeather(place);
      } catch (err) {
        setError('Failed to get location name');
        setLoading(false);
      }
    }, () => {
      setLoading(false);
      setError('Location permission denied');
    });
  }

  function saveCity() {
    if (!city) return;
    const id = `${city.name},${city.country}`;
    if (saved.find(s => s.id === id)) return;
    const next = [{ id, name: city.name, country: city.country }, ...saved].slice(0, 6);
    setSaved(next);
  }

  function removeSaved(id) {
    setSaved(saved.filter(s => s.id !== id));
  }

  return (
    <div className="py-8 bg-gradient-to-br from-gray-300 to-gray-470 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">
        {/* Left panel */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 flex flex-col gap-6">
            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search city (e.g. London)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-semibold text-sm"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={useMyLocation} 
                className="px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </button>
              <button 
                onClick={saveCity} 
                disabled={!city}
                className="px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Saved Cities</h3>
              <div className="space-y-2">
                {saved.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm">No saved cities yet</div>
                  </div>
                ) : (
                  saved.map(s => (
                    <div key={s.id} className="flex items-center justify-between gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group border border-gray-200">
                      <button 
                        onClick={() => fetchWeather(s.name)} 
                        className="text-left flex-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                      >
                        {s.name} 
                        <span className="text-xs text-gray-500 ml-1">· {s.country}</span>
                      </button>
                      <button 
                        onClick={() => removeSaved(s.id)} 
                        className="px-3 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg border border-red-200 transition-all duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">💡</span>
                </div>
                <div className="text-xs text-blue-500">
                  <strong>Tip:</strong> Save up to 6 cities for quick access.
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main panel */}
        <section className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            {loading ? (
              <div className="animate-pulse space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 bg-gray-200 rounded-2xl" />
                  <div className="space-y-3 flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-12 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-200">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-red-600 font-medium text-lg mb-4">{error}</div>
                <button 
                  onClick={() => setError(null)}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 font-semibold"
                >
                  Try Again
                </button>
              </div>
            ) : !current ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-700 mb-3">Search for Weather</div>
                <div className="text-gray-600 text-lg">Enter a city name to get started</div>
                <div className="mt-4 text-sm text-gray-500">Try: Karachi, London, New York, Tokyo</div>
              </div>
            ) : (
              <>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-50 to-gray-50 border border-gray-200 flex items-center justify-center shadow-inner">
                      <img 
                        src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} 
                        alt="" 
                        className="w-28 h-28 drop-shadow-lg"
                      />
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm mb-1">
                        {city.name}{city.state ? `, ${city.state}` : ''} — {city.country}
                      </div>
                      <div className="text-5xl font-bold text-gray-800 mt-1">{kToC(current.main.temp)}°C</div>
                      <div className="text-lg text-gray-600 mt-1 capitalize">
                        {current.weather[0].description} • Feels like {kToC(current.main.feels_like)}°C
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 min-w-[200px]">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-blue-100">Humidity</div>
                        <div className="text-2xl font-bold text-white">{current.main.humidity}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-100">Wind Speed</div>
                        <div className="text-xl font-semibold text-white">{Math.round(current.wind.speed * 3.6)} km/h</div>
                      </div>
                      <div className="text-xs text-blue-200 pt-2 border-t border-blue-400">
                        Updated: {new Date(current.dt * 1000).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {forecast.map((d) => (
                      <article 
                        key={d.date} 
                        className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-white transition-all duration-300 text-center group hover:shadow-md"
                      >
                        <div className="font-semibold text-gray-800 mb-2">{d.label}</div>
                        <img 
                          src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`} 
                          alt={d.description} 
                          className="mx-auto w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="text-sm text-gray-600 mb-3 capitalize">{d.description}</div>
                        <div className="text-gray-800">
                          <span className="text-lg font-bold">{d.temp_max}°</span>
                          <span className="text-sm text-gray-500"> / {d.temp_min}°</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
