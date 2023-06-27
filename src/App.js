
import './App.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Layout from './Navigation/Layout';
import SignUpPage from './SignUp/SignUpPage';
import { useContext } from 'react';
import { AuthContext } from './Auth/AuthContext';


function App() {
  const authContext=useContext(AuthContext);
  return (
    <Router>
 <Layout>
      <Switch>
        
      <Route path="/" exact><SignUpPage/></Route>
    
      </Switch>

    </Layout>
    </Router>
   
  );
}

export default App;
