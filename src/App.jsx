import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna!");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Memuat data pengguna...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Terjadi kesalahan: {error}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="title">📋 Daftar Pengguna</h1>

      <div className="grid-view">
        {users.map((user) => (
          <div key={user.id} className="grid-card">
            <div className="avatar-circle">
              <span>{user.name.charAt(0)}</span>
            </div>
            <h2 className="grid-name">{user.name}</h2>
            <p className="grid-email">{user.email}</p>
            <p className="grid-company">{user.company.name}</p>
            <div className="grid-info">
              <p>📞 {user.phone}</p>
              <p>🌐 {user.website}</p>
              <p>🏠 {user.address.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
