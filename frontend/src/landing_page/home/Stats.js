import React, { useState, useEffect } from 'react';

function Stats() {
    const [activeUsers, setActiveUsers] = useState("1.6+ crore");

    useEffect(() => {
        const fetchPlatformStats = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3002'}/api/platform-stats`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.activeUsers) {
                        const formatted = formatUserCountFull(data.activeUsers);
                        setActiveUsers(formatted);
                    }
                }
            } catch (error) {
                console.error("Error fetching platform stats:", error);
            }
        };

        fetchPlatformStats();
    }, []);

    const formatUserCountFull = (count) => {
        if (count >= 10000000) { // >= 1 crore
            return (count / 10000000).toFixed(1) + "+ crore";
        } else if (count >= 100000) { // >= 1 lakh
            return (count / 100000).toFixed(1) + "+ lakh";
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + "K+";
        }
        return count.toString();
    };

    return (  
       <div className='np-stats'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-6 p-4'>
                    <h1 className='display-6 mb-5' style={{ fontWeight: 800 }}>Trust with confidence</h1>

                    <h2>Customer-first always</h2>
                    <p>That's why {activeUsers} customers trust NovaPulse with ~ ₹6 lakh crores of equity investments, making us India's largest broker; contributing to 15% of daily retail exchange volumes in India.</p>
                    
                    <h2>No spam or gimmicks</h2>
                    <p>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <a href=''>Our philosophies.</a> </p>

                    <h2>The NovaPulse universe</h2>
                    <p>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                </div>
                <div className='col-lg-6 p-4'>
                    <div className='np-card text-center' style={{ background: '#fff' }}>
                        <div className='row'>
                            <div className='col-12 mb-4'>
                                <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>30+</p>
                                <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Fintech Partners</p>
                            </div>
                            <div className='col-6 border-end'>
                                <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--profit)', marginBottom: '0.5rem' }}>15%</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Daily Retail Volume</p>
                            </div>
                            <div className='col-6'>
                                <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary-light)', marginBottom: '0.5rem' }}>₹6L Cr</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Equity Investments</p>
                            </div>
                        </div>
                        <div className='mt-5 d-flex justify-content-center gap-4'>
                            <a href='' className='fw-bold'>Explore products →</a>
                            <a href='' className='fw-bold'>Try demo →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
}

export default Stats;
