import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/common/footer/Footer'
import NavBar from './components/common/navbar/NavBar'
import NotFound from './components/common/notfound/NotFound'
import Home from './components/feed/home/Home'
import Login from './components/profile/login/Login'
import SignUp from './components/profile/signup/SignUp'
import { AuthProvider } from './context/auth'


function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route exact={true} path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
