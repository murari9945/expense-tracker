import { useState, useRef, useContext,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import classes from './SignUpPage.module.css';
import ProfilePage from '../Auth/ProfilePage';
import { authActions } from '../Auth/authReducer';
import {login} from '../Auth/authReducer';
//import { AuthContext } from '../Auth/AuthContext';


const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

 // const authContext = useContext(AuthContext);
  

 const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 const token = useSelector((state) => state.auth.token);

 // const newPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
 
  const submitHandler = (event) => {
    event.preventDefault();
    const givenEmail = emailRef.current.value;
    const givenPassword = passwordRef.current.value;
   

    setisLoading(true);

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClIPPOHZO2rXXR0jqDK2r6W4eXHCqU5SQ', {
        method: 'POST',
        body: JSON.stringify({
          email: givenEmail,
          password: givenPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          setisLoading(false);
          if (res.ok) {
            return res.json().then((data) => {
              const idToken = data.idToken;
              dispatch(authActions.login(idToken));
              console.log(idToken);
             // authContext.login(idToken);
              history.push('/add-expense');
            });
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed';
              alert(errorMessage);
              console.log(data);
            });
          }
        })
        .catch((error) => {
          setisLoading(false);
          console.log('Error:', error);
        });
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClIPPOHZO2rXXR0jqDK2r6W4eXHCqU5SQ', {
        method: 'POST',
        body: JSON.stringify({
          email: givenEmail,
          password:givenPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          setisLoading(false);
          if (res.ok) {
            // Handle successful sign-up
            
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed';
              alert(errorMessage);
              console.log(data);
            });
          }
        })
        .catch((error) => {
          setisLoading(false);
          console.log('Error:', error);
        });
    }
    if (!isLogin) {
      // Redirect to the forgot password page
      history.push('/add-expense');
    }

   
       
  };
  

  if (isLogin && isLoggedIn) {
    // Render the dummy screen
    return (
      <section>
      
       
       <ProfilePage idToken={token}/>
     
      </section>
    );
  }

 

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'login' : 'create account'}</button>}
          

          {!isLogin ? (
            <Link to="/forgot-password">Forgot Password</Link>
          ) : (
            <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
              Create new account
            </button>
          )}
        </div>
      </form>
     

      
    </section>
  );
};

export default SignUp;
