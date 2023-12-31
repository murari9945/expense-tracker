import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { AuthContext } from './AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '../Auth/authReducer';


const Profile = () => {
  const dispatch=useDispatch();
  //const [showForm, setShowForm] = useState(false);
  //const [fullName, setFullName] = useState('');
  //const [profileUrl, setProfileUrl] = useState('');
  //const authCxt = useContext(AuthContext);
  const { showForm, fullName, profileUrl } = useSelector((state) => state.profile);

  useEffect(() => {
    if (token) {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyClIPPOHZO2rXXR0jqDK2r6W4eXHCqU5SQ`,
        {
          method: 'POST',
          body: JSON.stringify({
            idToken:token,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.users && data.users.length > 0) {
            const user = data.users[0];
           // setFullName(user.displayName || '');
           // setProfileUrl(user.photoUrl || '');
           dispatch(profileActions.setFullName(user.displayName || ''));
           dispatch(profileActions.setProfileUrl(user.photoUrl || ''));
          }
        })
        .catch((error) => {
          console.log('Profile retrieval error:', error);
        });
    }
  }, [dispatch,token]);

  const handleCompleteNowClick = () => {
    //setShowForm(true);
    dispatch(profileActions.toggleForm())
  };

  const handleCancelClick = () => {
   // setShowForm(false);
   // setFullName('');
  //  setProfileUrl('');
  dispatch(profileActions.toggleForm())
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();
    // Perform the update logic
    console.log('Update clicked:', fullName, profileUrl);

    // Reset the form
   // setFullName('');
    //setProfileUrl('');
    //setShowForm(false);
    dispatch(profileActions.updateProfile({ fullName, profileUrl }));

    // Reset the form data if needed
    dispatch(profileActions.toggleForm());
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Welcome to Expense Tracker</h1>
      <p>Your profile is incomplete. Complete now:</p>
      <Link to="#" onClick={handleCompleteNowClick}>
        Complete now
      </Link>
    </div>
  );
};

export default Profile;
