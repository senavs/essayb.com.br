import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import NavBar from './components/common/navbar/NavBar'
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
    </Router>
  );
}

export default App;
