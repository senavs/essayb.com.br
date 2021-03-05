import { BrowserRouter as Router } from 'react-router-dom'

import Body from './components/common/Body'
import Footer from './components/common/Footer'
import NavBar from './components/common/NavBar'
import { AuthProvider } from './contexts/auth'
import AppRoutes from './routes/routes'


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Body>
          <AppRoutes />
        </Body>
        <Footer />
      </AuthProvider>
    </Router>
  );
}
