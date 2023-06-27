
import './App.css';
import {BrowserRouter as Router,Switch,Route,useHistory } from 'react-router-dom';
import Layout from './Navigation/Layout';
import SignUpPage from './SignUp/SignUpPage';
import { useContext} from 'react';
import { AuthContext } from './Auth/AuthContext';


function App() {
  const authContext=useContext(AuthContext);
  const history = useHistory();
  const handleVerifyEmail = () => {
    authContext.sendEmailVerification();
  };
  const logoutHandler = () => {
    authContext.logout(); // Clear the authentication token
    history.push('/'); // Redirect to signup page
  };
  return (
    <Router>
 <Layout>
      <Switch>
        
      <Route path="/" exact>{authContext.isLoggedIn ? (
            <>
              <p>Please verify your email address by clicking the button below:</p>
              <button onClick={handleVerifyEmail}>Verify Email</button>
              <button onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <SignUpPage />
          )}</Route>
    
      </Switch>

    </Layout>
    </Router>
   
  );
}

export default App;
