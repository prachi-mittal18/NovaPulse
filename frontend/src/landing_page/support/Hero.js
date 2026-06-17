import React from 'react';

function Hero() {
    return (  
        <section className='container-fluid py-5' style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
            <div className='container'>
                <div className='d-flex justify-content-between align-items-center mb-5'>
                    <h4 style={{ fontWeight: 800, color: 'var(--text-heading)' }}>Support & Resources</h4>
                    <a href='' className='fw-bold'>Documentation</a>
                </div>

                <div className='row'>
                    <div className='col-lg-7'>
                        <h1 className='h3 mb-4' style={{ fontWeight: 700 }}>Get help with trading, account setup, or platform features</h1>
                        <div className='mb-4'>
                            <input 
                                className='form-control form-control-lg' 
                                placeholder='Eg: How do I place a limit order, How do I withdraw funds, How does P&L calculation work...'
                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1rem 1.5rem' }}
                            />
                        </div>
                        <div className='d-flex flex-wrap gap-3'>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Getting Started</a>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Account Setup</a>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Trading Guide</a>
                            <a href='' className='text-muted' style={{ borderBottom: '1px solid var(--border)' }}>Security</a>
                        </div>
                    </div>
                    <div className='col-lg-5 mt-5 mt-lg-0 ps-lg-5'>
                        <h1 className='h3 mb-4' style={{ fontWeight: 700 }}>Quick Links</h1>
                        <ol className='list-group list-group-flush' style={{ background: 'transparent' }}>
                            <li className='list-group-item px-0' style={{ background: 'transparent' }}>
                                <a href='' className='text-decoration-none'>Understanding Market Orders vs Limit Orders</a>
                            </li>
                            <li className='list-group-item px-0' style={{ background: 'transparent' }}>
                                <a href='' className='text-decoration-none'>How to Calculate Your Portfolio P&L</a>
                            </li>
                            <li className='list-group-item px-0' style={{ background: 'transparent' }}>
                                <a href='' className='text-decoration-none'>Trading PIN Security Best Practices</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;