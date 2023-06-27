import React, { useRef, useState } from 'react';

const ForgotPassword = () => {
  const emailRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    setIsLoading(true);

    // Send password reset email
    // Replace 'API_KEY' with your actual Firebase API key
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyClIPPOHZO2rXXR0jqDK2r6W4eXHCqU5SQ`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        requestType: 'PASSWORD_RESET',
      }),
    })
      .then((response) => {
        setIsLoading(false);
        setIsSent(true);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Error:', error);
      });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!isSent && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} required />
          <button type="submit" disabled={isLoading}>
            Reset Password
          </button>
        </form>
      )}
      {isSent && <p>Reset password link sent to your email address. Please check your inbox.</p>}
    </div>
  );
};

export default ForgotPassword;
