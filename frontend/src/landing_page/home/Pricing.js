import React from 'react';

function Pricing() {
    return ( 
        <div className='np-pricing'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-5'>
                        <h1 className='display-6 mb-3' style={{ fontWeight: 800 }}>Unbeatable pricing</h1>
                        <p style={{ fontSize: '1.1rem' }}>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                        <a href='' className='fw-bold'>See pricing →</a>
                    </div>
                
                    <div className='col-lg-7 d-flex flex-wrap justify-content-center gap-3 mt-4 mt-lg-0'>
                        <div className='np-pricing-card' style={{ flex: '1 1 200px', padding: '1.5rem' }}>
                            <div className='price' style={{ fontSize: '2.5rem' }}>₹0</div>
                            <div className='fw-bold mt-2'>Free account opening</div>
                        </div>
                        <div className='np-pricing-card' style={{ flex: '1 1 200px', padding: '1.5rem' }}>
                            <div className='price' style={{ fontSize: '2.5rem' }}>₹0</div>
                            <div className='fw-bold mt-2'>Equity delivery</div>
                        </div>
                        <div className='np-pricing-card' style={{ flex: '1 1 200px', padding: '1.5rem' }}>
                            <div className='price' style={{ fontSize: '2.5rem' }}>₹20</div>
                            <div className='fw-bold mt-2'>Intraday and F&Os</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;