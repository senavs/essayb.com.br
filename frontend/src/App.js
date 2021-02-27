import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import NavBar from './components/common/navbar/NavBar'
import SignUp from './components/profile/signup/SignUp'
import Footer from './components/common/footer/Footer'
import NotFound from './components/common/notfound/NotFound'
import Home from './components/feed/home/Home'
import Login from './components/profile/login/Login'

import AuthProvider from './context/AuthProvider'


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
