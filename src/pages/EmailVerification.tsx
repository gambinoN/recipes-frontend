import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmailVerification = () => {
    const { token } = useParams();
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:3001/auth/verify/${token}`);
                const data = await response.json();
    
                if (response.ok) {
                    setVerificationStatus('Email Verified Successfully');
                } else {
                    setVerificationStatus(data.message || 'Email Verification Failed');
                }
            } catch (error) {
                setVerificationStatus('An error occurred during verification. Please try again later.');
                console.error('Verification error:', error);
            }
        };
    
        verifyEmail();
    }, [token]);

    return (
        <>
        <h2>Email Verification</h2>
        <p>{verificationStatus}</p>
        </>
    )
}

export default EmailVerification;