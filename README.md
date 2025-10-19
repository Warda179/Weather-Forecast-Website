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

**Step by step Guide on how someone can use your Weather Forecast Application**:

---

### 1. **Clone the Repository**

```bash
git clone https://github.com/YourUsername/Weather-Forecast-App.git
cd Weather-Forecast-App
```

---

### 2. **Install Dependencies**

Make sure you have Node.js installed. Then run:

```bash
npm install
```

---

### 3. **Set Up OpenWeatherMap API Key**

1. Sign up at [OpenWeatherMap](https://openweathermap.org/) and get your API key.
2. In the project root, create a `.env` file.
3. Add the key like this:

```
REACT_APP_OWM_API_KEY=YOUR_API_KEY_HERE
```

 Make sure to replace `YOUR_API_KEY_HERE` with your actual key.

---

### 4. **Run the Application**

```bash
npm start
```

This will start the development server and open the app at `http://localhost:3000`.


---
<img width="1915" height="932" alt="image" src="https://github.com/user-attachments/assets/d134e0b8-95ad-4d3d-bce3-b1c14b492a60" />
