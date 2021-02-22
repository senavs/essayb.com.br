import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import NavBar from './components/common/navbar/NavBar'
import Footer from './components/common/footer/Footer'
import NotFound from './components/common/notfound/NotFound'
import Home from './components/feed/home/Home'

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
