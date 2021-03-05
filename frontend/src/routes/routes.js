import { Route, Switch } from 'react-router-dom';

import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';
import Profile from '../pages/user/Profile';
import PrivateRoute from './private';


export default function AppRoutes() {
  return (
    <Switch>
      <Route exact={true} path='/' component={Index} />
      <Route exact={true} path='/signup' component={SignUp} />
      <Route exact={true} path='/login' component={Login} />
      <PrivateRoute exact={true} path='/profile' component={Profile} />
      <Route exact={true} path='/profile/:username' component={Profile} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}