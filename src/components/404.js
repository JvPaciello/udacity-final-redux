import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 70px)',
      textAlign: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '24px',
        padding: '56px 48px',
        maxWidth: '420px',
        width: '100%',
        backdropFilter: 'blur(20px)',
      }}>
        <p style={{
          fontSize: '80px',
          fontWeight: '900',
          margin: '0 0 8px',
          background: 'linear-gradient(135deg, #818cf8, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}>404</p>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: '0 0 10px' }}>
          Page not found
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', margin: '0 0 32px' }}>
          The poll you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '12px 28px',
            border: 'none',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            fontSize: '14.5px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)';
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default NotFound;
