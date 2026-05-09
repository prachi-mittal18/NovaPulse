import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='ao-notfound'>
            <div>
                <h1>404</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" style={{
                    display: 'inline-block',
                    marginTop: '1.5rem',
                    background: 'linear-gradient(135deg, #7C3AED, #6366f1)',
                    color: '#fff',
                    padding: '12px 32px',
                    borderRadius: '28px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)'
                }}>
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
