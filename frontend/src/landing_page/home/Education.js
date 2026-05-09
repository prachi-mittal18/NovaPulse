import React from 'react';

function Education() {
    return ( 
        <div className='ao-education'>
            <div className='container'>
                <div className='row p-5 align-items-center'>
                    <div className='col-lg-6'>
                        <div className='ao-card text-center' style={{ background: '#fff' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
                            <h3 className='mb-2'>Varsity</h3>
                            <p className='mb-0'>The largest free stock market education resource</p>
                        </div>
                    </div>
                    <div className='col-lg-6 ps-lg-5 mt-4 mt-lg-0'>
                        <h1 className='display-6 mb-4' style={{ fontWeight: 800 }}>Free and open market education</h1>
                        <p className='mt-4'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                        <a href='' className='fw-bold'>Explore Varsity →</a>
                        
                        <p className='mt-4'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                        <a href='' className='fw-bold'>Visit TradingQ&A →</a>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Education;