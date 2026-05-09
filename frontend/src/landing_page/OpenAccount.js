import React from 'react';

function OpenAccount() {
    return (
         <div className='ao-cta-section'>
            <div className='container'>
                <h2>Open an ArthaOdha account</h2>
                <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <button className='hero-cta' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Sign up for free</button>
            </div>
        </div>
    );
}

export default OpenAccount;