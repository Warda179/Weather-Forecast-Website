# Weather Forecast Application

A modern full-stack web application that provides **real-time weather information**. Users can search for cities, view current weather conditions, and save favorite cities for quick access. Built with a responsive and clean UI using React.js and Tailwind CSS, and powered by the OpenWeatherMap API.

---

## Features
- Real-time weather updates using OpenWeatherMap API
- Search weather by city name
- Current weather conditions display (temperature, humidity, wind speed, feels like)
- 5-day weather forecast
- User can save up to 6 favorite cities for quick access
- Responsive UI for desktop and mobile
- Geolocation support to fetch weather for your current location

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** FastAPI (optional, if extended for authentication & database)
- **Database:** PostgreSQL (optional, for saving user favorites)
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)

---

## API Key
The application requires an OpenWeatherMap API key. You can add it in your environment variables:

```bash
const API_KEY = "YOUR_API_KEY_HERE";
```

---
<img width="1915" height="932" alt="image" src="https://github.com/user-attachments/assets/d134e0b8-95ad-4d3d-bce3-b1c14b492a60" />


# .env
REACT_APP_OWM_API_KEY=YOUR_API_KEY_HERE
