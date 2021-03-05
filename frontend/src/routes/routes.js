import { Route, Switch } from 'react-router-dom';
import { urls } from '../config/frontend';

import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';
import Profile from '../pages/user/Profile';
import PrivateRoute from './private';


export default function AppRoutes() {
  return (
    <Switch>
      <Route exact={true} path={urls.common.index} component={Index} />
      <Route exact={true} path={urls.auth.signup} component={SignUp} />
      <Route exact={true} path={urls.auth.login} component={Login} />
      <PrivateRoute exact={true} path={urls.user.me} component={Profile} />
      <Route exact={true} path={urls.user.others} component={Profile} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}