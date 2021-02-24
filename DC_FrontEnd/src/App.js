import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Components/Login_Register/Login';
import NavbarDC from './Components/Navbar/NavbarDC';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateKeys from './Components/Login_Register/CreateKeys';
import Account from './Components/Account/Account';


function App() {
  return (

    <Router>
        <NavbarDC />

      <Container>
        <Route path="/" exact component={Dashboard} /> 
        {/* change path */}
        <Route path="/registerKeys" component={CreateKeys} />
        <Route path="/login" component={Login} />
        <Route path="/account" component={Account} />
      </Container>



    </Router>

  );
}

export default App;
