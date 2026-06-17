import React from 'react';

function Education() {
    return ( 
        <div className='np-education'>
            <div className='container'>
                <div className='row p-5 align-items-center'>
                    <div className='col-lg-6'>
                        <div className='np-card text-center' style={{ background: '#fff' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📈</div>
                            <h3 className='mb-2'>Learning Hub</h3>
                            <p className='mb-0'>Master the fundamentals of stock trading and investing</p>
                        </div>
                    </div>
                    <div className='col-lg-6 ps-lg-5 mt-4 mt-lg-0'>
                        <h1 className='display-6 mb-4' style={{ fontWeight: 800 }}>Empower yourself with knowledge</h1>
                        <p className='mt-4'>Our comprehensive learning resources cover everything from understanding market basics to advanced trading strategies. Learn at your own pace with real-world examples and case studies.</p>
                        <a href='' className='fw-bold'>Explore Learning Hub →</a>
                        
                        <p className='mt-4'>Connect with a thriving community of traders and investors. Share experiences, ask questions, and learn from fellow market enthusiasts on NovaPulse Community Forum.</p>
                        <a href='' className='fw-bold'>Join Community →</a>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Education;