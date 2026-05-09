import React from 'react';

function Hero() {
    return (  
        <section className='container-fluid py-5' style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
            <div className='container'>
                <div className='d-flex justify-content-between align-items-center mb-5'>
                    <h4 style={{ fontWeight: 800, color: 'var(--text-heading)' }}>Support Portal</h4>
                    <a href='' className='fw-bold'>Track Tickets</a>
                </div>

                <div className='row'>
                    <div className='col-lg-7'>
                        <h1 className='h3 mb-4' style={{ fontWeight: 700 }}>Search for an answer or browse help topics to create a ticket</h1>
                        <div className='mb-4'>
                            <input 
                                className='form-control form-control-lg' 
                                placeholder='Eg: how do i activate F&O, why is my order getting rejected...'
                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1rem 1.5rem' }}
                            />
                        </div>
                        <div className='d-flex flex-wrap gap-3'>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Track account opening</a>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Track segment activation</a>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Intraday margins</a>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Kite user manual</a>
                        </div>
                    </div>
                    <div className='col-lg-5 mt-5 mt-lg-0 ps-lg-5'>
                        <h1 className='h3 mb-4' style={{ fontWeight: 700 }}>Featured</h1>
                        <ol className='list-group list-group-flush' style={{ background: 'transparent' }}>
                            <li className='list-group-item px-0' style={{ background: 'transparent' }}>
                                <a href='' className='text-decoration-none'>Current Takeovers and Delisting- January 2024</a>
                            </li>
                            <li className='list-group-item px-0' style={{ background: 'transparent' }}>
                                <a href='' className='text-decoration-none'>Latest Intraday leverages-MIS & CO</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;