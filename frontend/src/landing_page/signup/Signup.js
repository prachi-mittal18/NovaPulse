import React, { useState } from 'react';

function Signup() {
    const [phone, setPhone] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (phone.length === 10) {
            setShowOTP(true);
        } else {
            alert("Please enter a valid 10-digit phone number");
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        if (otp === "1234") {
            alert("Verification Successful!");
            window.location.href = "http://localhost:3000"; // Go to dashboard
        } else {
            alert("Invalid OTP. Try 1234");
        }
    };

    return ( 
        <div className='container py-5 mt-5'>
            <div className='row justify-content-center'>
                <div className='col-lg-5 col-md-8'>
                    <div className='ao-card p-5' style={{ background: '#fff' }}>
                        <h1 className='display-6 text-center mb-4' style={{ fontWeight: 800 }}>Signup now</h1>
                        <p className='text-center text-muted mb-5'>
                            Or track your existing application
                        </p>

                        {!showOTP ? (
                            <form onSubmit={handleSendOTP}>
                                <div className='mb-4'>
                                    <div className='input-group'>
                                        <span className='input-group-text' style={{ background: '#f8fafc', borderRight: 'none' }}>+91</span>
                                        <input 
                                            type='number' 
                                            className='form-control form-control-lg' 
                                            placeholder='Enter your phone number'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            style={{ borderLeft: 'none', fontSize: '1rem' }}
                                            required
                                        />
                                    </div>
                                    <div className='form-text mt-2 small text-muted'>
                                        You will receive an OTP on this number
                                    </div>
                                </div>

                                <button type='submit' className='hero-cta w-100 mt-3'>
                                    Continue
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerify}>
                                <div className='mb-4 text-center'>
                                    <p className='small text-muted'>OTP sent to <strong>+91 {phone}</strong></p>
                                    <input 
                                        type='number' 
                                        className='form-control form-control-lg text-center' 
                                        placeholder='Enter 4-digit OTP'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        style={{ letterSpacing: '8px', fontSize: '1.5rem', fontWeight: 700 }}
                                        required
                                    />
                                    <div className='form-text mt-3 small'>
                                        Didn't receive? <a href='' onClick={() => setShowOTP(false)}>Resend</a>
                                    </div>
                                </div>

                                <button type='submit' className='hero-cta w-100 mt-3'>
                                    Verify & Signup
                                </button>
                            </form>
                        )}

                        <p className='mt-5 text-center small text-muted'>
                            By proceeding, you agree to our <a href=''>Terms</a> and <a href=''>Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Signup;