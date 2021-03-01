import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Body from './components/common/body/Body'
import Footer from './components/common/footer/Footer'
import NavBar from './components/common/navbar/NavBar'
import NotFound from './components/common/notfound/NotFound'
import Home from './components/feed/home/Home'
import Login from './components/user/login/Login'
import Profile from './components/user/profile/Profile'
import SignUp from './components/user/signup/SignUp'
import { AuthProvider } from './context/auth'
import { PrivateRoute } from './utils/routes'


function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <Body>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/signup" component={SignUp} />
            <Route exact={true} path="/login" component={Login} />
            <PrivateRoute exact={true} path="/profile" component={Profile} />
            <Route exact={true} path="/profile/:username" component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Body>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
