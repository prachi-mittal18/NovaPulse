import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return ( 
        <div className='ao-hero'>
            <div className='container'>
                <h1 className='mb-4'>
                    Invest <span className='gradient-text'>Smarter</span>.<br/>
                    Grow <span className='gradient-text'>Faster</span>.
                </h1>
                <p className='hero-subtitle'>
                    Your modern platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more — all at zero brokerage.
                </p>
                
                <Link to='/signup' className='hero-cta'>
                    Start Investing — It's Free
                </Link>

                <div className='row mt-5 pt-4 justify-content-center'>
                    <div className='col-auto px-4'>
                        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0' }}>1.6Cr+</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Investors</p>
                    </div>
                    <div className='col-auto px-4 border-start border-end'>
                        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--profit)', marginBottom: '0' }}>₹0</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Equity Delivery</p>
                    </div>
                    <div className='col-auto px-4'>
                        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0' }}>₹20</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Flat Intraday</p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Hero;
