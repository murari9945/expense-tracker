import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const authCxt=useContext(AuthContext);
  const handleCompleteNowClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setFullName('');
    setProfileUrl('');
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();
    // Perform the update logic
    console.log('Update clicked:', fullName, profileUrl);
    
    // Reset the form
    //setFullName('');
   // setProfileUrl('');
   // setShowForm(false);
   fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyClIPPOHZO2rXXR0jqDK2r6W4eXHCqU5SQ`,
    {
      method: 'POST',
      body :JSON.stringify( {
        idToken:authCxt.token,
        displayName: fullName,
        photoUrl: profileUrl,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
     
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('Update successful:', data);
      // Reset the form
      setFullName('');
      setProfileUrl('');
      setShowForm(false);
    })
    .catch((error) => {
      console.log('Update error:', error);
    });
  };

  if (showForm) {
    return (
      <form>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

        <label htmlFor="profileUrl">Profile URL:</label>
        <input
          type="text"
          id="profileUrl"
          value={profileUrl}
          onChange={(event) => setProfileUrl(event.target.value)}
        />

        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
        <button type="submit" onClick={handleUpdateClick}>
          Update
        </button>
      </form>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>Welcome to Expense Tracker</h1>
      <p>Your profile is incomplete. Complete now:</p>
      <Link to="#" onClick={handleCompleteNowClick}>
        Complete now
      </Link>
    </div>
  );
};

export default Profile;
