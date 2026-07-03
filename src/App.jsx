import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Space from './pages/Space';
import Defence from './pages/Defence';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <iframe
              src={`/landing.html${window.location.hash}`}
              style={{ width: '100%', height: '100vh', border: 'none' }}
              title="SpaceShield Landing"
            />
          }
        />
        <Route
          path="/space"
          element={
            <>
              <Navbar onSearch={setSearchTerm} />
              <Space searchTerm={searchTerm} />
            </>
          }
        />
        <Route
          path="/defence"
          element={
            <>
              <Navbar onSearch={setSearchTerm} />
              <Defence searchTerm={searchTerm} />
            </>
          }
        />
        <Route
          path="/privacy"
          element={
            <>
              <Navbar onSearch={setSearchTerm} />
              <Privacy />
            </>
          }
        />
        <Route
          path="/terms"
          element={
            <>
              <Navbar onSearch={setSearchTerm} />
              <Terms />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
