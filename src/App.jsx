import React, { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("Jakarta");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "35bef3eba76541e0abe145806252710"; // 🔑 Ganti dengan API key dari https://www.weatherapi.com/

  // Fetch data cuaca
  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      if (!res.ok) throw new Error("Kota tidak ditemukan!");
      const data = await res.json();

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data pertama kali
  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        borderRadius: 12,
        background: "#f5f5f5",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>🌤️ Pendeteksi Cuaca</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Masukkan nama kota..."
          style={{
            width: "70%",
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 8,
            padding: "8px 12px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Cari
        </button>
      </form>

      {loading && <p>🔄 Memuat data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ textAlign: "center" }}>
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <h2>{weather.current.temp_c}°C</h2>
          <p>{weather.current.condition.text}</p>
          <p>Kelembapan: {weather.current.humidity}%</p>
          <p>Angin: {weather.current.wind_kph} km/jam</p>
        </div>
      )}
    </div>
  );
}

export default App;
