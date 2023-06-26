import { Link } from 'react-router-dom';

import classes from './HeaderNav.module.css';


const MainNavigation = () => {

  
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>MyWebLink</div>
      </Link>
      <nav>
        <ul>
         <li>
             <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to ='/products'>Products</Link>
        </li>      
        <li>
        <Link to='/about'>About us</Link>
        </li> 
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
