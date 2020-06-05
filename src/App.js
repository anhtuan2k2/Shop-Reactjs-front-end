import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

import LoginPage from './containers/LoginPage/LoginPage';
import HomePage from './containers/HomePage/HomePage';

import Testpage2 from './containers/Testpage2';
import DetailProduct from './containers/DetailProduct/DetailProduct';
import CartPage from './containers/CartPage/CartPage';
import RegisterForm from './containers/RegisterAccount/RegisterForm';

// import * as actions from './store/actions/index';

const App = (props) => {
  let routes = (
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/product/:id' component={DetailProduct} />
      <Route path='/cart/:id' component={CartPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/Register' component={RegisterForm} />
      <Route path='/testpage2' component={Testpage2} />
      <Redirect to='/' />
    </Switch>
    //   <Switch>
    //   <Route path="/auth" component={Auth} />
    //   <Route path="/" exact component={BurgerBuilder} />
    //   <Redirect to="/" />
    // </Switch>
  );
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>{routes}</Suspense>
    </div>
  );
};

export default withRouter(App);
