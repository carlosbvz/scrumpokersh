import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginPage from './pages/login/login';
import ScrumPocker from './pages/scrum-pocker/scrum-pocker';
import './App.css';


class App extends React.Component {



  render() {
    return (
      <Router>
        <Container fluid>
          <Route exact path="/" component={LoginPage}></Route>
          <Route exact path="/scrum-pocker" component={ScrumPocker}></Route>
        </Container>
      </Router>
    )
  }

}

export default App;
