
import './App.css';
import { Switch,Route } from 'react-router-dom';
import Layout from './Navigation/Layout';
import SignUpPage from './SignUp/SignUpPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/"><SignUpPage/></Route>
      </Switch>

    </Layout>
  );
}

export default App;
