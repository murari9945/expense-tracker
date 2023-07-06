
import './App.css';
import {BrowserRouter as Router,Switch,Route,useHistory } from 'react-router-dom';
import Layout from './Navigation/Layout';
import SignUpPage from './SignUp/SignUpPage';
import { useContext} from 'react';
//import { AuthContext } from './Auth/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import ForgotPassword from './Auth/ForgetPassword';
import AddExpensePage from './SignUp/AddExpensePage';
import { authActions } from './Auth/authReducer';


function App() {
//  const authContext=useContext(AuthContext);
const dispatch =useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const isEmailVerified = useSelector((state) => state.auth.isEmailVerified);
  const handleVerifyEmail = () => {
    dispatch(authActions.sendEmailVerification());
  };
  const logoutHandler = () => {
    dispatch(authActions.logout()); // Clear the authentication token
    history.push('/'); // Redirect to signup page
  };
  return (
    <Router>
 <Layout>
      <Switch>
      <Route path="/" exact>
            {isLoggedIn ? (
              isEmailVerified ? (
                // Render the add expense page if email is verified
                <AddExpensePage />
              ) : (
                <>
                  <p>Please verify your email address by clicking the button below:</p>
                  <button onClick={handleVerifyEmail}>Verify Email</button>
                  <button onClick={logoutHandler}>Logout</button>
                </>
              )
            ) : (
              <SignUpPage />
            )}
          </Route>
        
      
    <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/add-expense">
            <AddExpensePage />
          </Route>
      </Switch>

    </Layout>
    </Router>
   
  );
}

export default App;
