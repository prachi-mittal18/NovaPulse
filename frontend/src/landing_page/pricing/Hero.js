import React from 'react';

function Hero() {
    return (
        <div className='container np-pricing-page'>
          <div className='row text-center mt-5'>
            <h1 className='mt-5' style={{ background: 'linear-gradient(135deg, #06b6d4, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Charges</h1>
            <p style={{fontSize:"1.2rem", color: '#9a9ab0'}} className='mb-5'>List of all charges and taxes</p>
          </div>

          <div className='row'>
            <div className='col-4 p-4 mt-4'>
              <div className='np-pricing-card'>
                <div className='price'>₹0</div>
                <h3 className='text-center fs-5 mt-3 mb-3' style={{ color: '#e8e8f0', fontWeight: 600 }}>Free equity delivery</h3>
                <p style={{ color: '#9a9ab0', fontSize: '0.9rem' }}>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
              </div>
            </div>

            <div className='col-4 p-4 mt-4'>
              <div className='np-pricing-card'>
                <div className='price'>₹20</div>
                <h3 className='text-center fs-5 mt-3 mb-3' style={{ color: '#e8e8f0', fontWeight: 600 }}>Intraday and F&O trades</h3>
                <p style={{ color: '#9a9ab0', fontSize: '0.9rem' }}>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades.</p>
              </div>
            </div>

            <div className='col-4 p-4 mt-4'>
              <div className='np-pricing-card'>
                <div className='price'>₹0</div>
                <h3 className='text-center fs-5 mt-3 mb-3' style={{ color: '#e8e8f0', fontWeight: 600 }}>Free direct MF</h3>
                <p style={{ color: '#9a9ab0', fontSize: '0.9rem' }}>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Hero;