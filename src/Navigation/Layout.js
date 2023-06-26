import { Fragment } from 'react';

import HeaderNav from './HeaderNav';

const Layout = (props) => {
  return (
    <Fragment>
      <HeaderNav/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;