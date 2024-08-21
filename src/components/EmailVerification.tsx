import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface EmailverificationProps {
    email: string
}

const EmailVerification: React.FC<EmailverificationProps> = () => {
    const { token } = useParams();
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');

    useEffect(() => {
        fetch(`/verify/${token}`)
        .then ((response) => response.json())
        .then ((data) => {
            if (data.success) {
            setVerificationStatus('Email Verified Successfully');
            } else {
            setVerificationStatus('Email Verification Failed');
            }
        });
    }, [token])

    return (
        <>
        <h2>Email Verification</h2>
        <p>{verificationStatus}</p>
        </>
    )
}

export default EmailVerification;