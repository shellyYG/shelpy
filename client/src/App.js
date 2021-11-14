// export default App;
import React from 'react';
import './App.css';
// import { useSelector, useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HelperListPage from './pages/HelperListPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import BookAppointmentPage from './pages/BookAppointmentPage';


function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/find-helpers" component={HelperListPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/book-appointment-form" component={BookAppointmentPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
