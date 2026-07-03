import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navBase = {
  background: 'rgba(6,11,20,0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  padding: '16px 48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const searchContainerBase = {
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '999px',
  padding: '8px 20px',
  gap: '8px',
  width: '280px',
  backdropFilter: 'blur(10px)',
  transition: 'border 0.3s ease',
};

const searchContainerFocused = {
  ...searchContainerBase,
  border: '1px solid rgba(255,107,53,0.5)',
};

function NavLink({ to, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        color: hovered ? 'white' : 'rgba(255,255,255,0.7)',
        fontSize: '14px',
        fontWeight: 500,
        textDecoration: 'none',
        marginLeft: '32px',
        borderBottom: hovered ? '1px solid #FF6B35' : 'none',
        paddingBottom: hovered ? '2px' : '0px',
        transition: 'all 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

export default function Navbar({ onSearch }) {
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav style={navBase}>
      <style>{`
        .glass-search-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <div>
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', background: 'linear-gradient(90deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>
          🛡️ SpaceShield
        </Link>
      </div>
      {location.pathname !== '/' && (
        <div style={searchFocused ? searchContainerFocused : searchContainerBase}>
          <span style={{ color: '#9CA3AF', fontSize: '14px' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search articles..." 
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="glass-search-input"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '14px',
              width: '100%'
            }}
          />
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <NavLink to="/space">Space</NavLink>
        <NavLink to="/defence">Defence</NavLink>
        <NavLink to="/#footer">About</NavLink>
        <NavLink to="/#apis">Live APIs</NavLink>
      </div>
    </nav>
  );
}
