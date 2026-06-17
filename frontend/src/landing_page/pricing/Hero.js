import React from 'react';

function Hero() {
    return (
        <div className='container np-pricing-page'>
          <div className='row text-center mt-5'>
            <h1 className='mt-5' style={{ background: 'linear-gradient(135deg, #06b6d4, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Simple, Transparent Pricing</h1>
            <p style={{fontSize:"1.2rem", color: '#9a9ab0'}} className='mb-5'>No hidden charges. Ever.</p>
          </div>

          <div className='row'>
            <div className='col-4 p-4 mt-4'>
              <div className='np-pricing-card'>
                <div className='price'>₹0</div>
                <h3 className='text-center fs-5 mt-3 mb-3' style={{ color: '#e8e8f0', fontWeight: 600 }}>Zero Brokerage</h3>
                <p style={{ color: '#9a9ab0', fontSize: '0.9rem' }}>All equity delivery trades on NSE and BSE have zero brokerage. Trade stocks without worrying about commission costs.</p>
              </div>
            </div>

            <div className='col-4 p-4 mt-4'>
              <div className='np-pricing-card'>
                <div className='price'>₹20</div>
                <h3 className='text-center fs-5 mt-3 mb-3' style={{ color: '#e8e8f0', fontWeight: 600 }}>Intraday Trading</h3>
                <p style={{ color: '#9a9ab0', fontSize: '0.9rem' }}>Flat ₹20 per intraday trade, or 0.03% of order value—whichever is lower. Perfect for active traders.</p>
              </div>
            </div>

            <div className='col-4 p-4 mt-4'>
              <div className='np-pricing-card'>
                <div className='price'>₹0</div>
                <h3 className='text-center fs-5 mt-3 mb-3' style={{ color: '#e8e8f0', fontWeight: 600 }}>Portfolio Tracking</h3>
                <p style={{ color: '#9a9ab0', fontSize: '0.9rem' }}>Real-time P&L analytics, historical charts, and performance metrics. All included with your account.</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Hero;