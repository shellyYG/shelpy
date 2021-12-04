// export default App;
import React from 'react';
import './App.css';
// import { useSelector, useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPasswordPage from './pages/SignUpPasswordPage';
import LandingPageHelper from './pages/LandingPageHelper';
import ServiceOptionPage from './pages/ServiceOptionPage';
import AboutPage from './pages/AboutPage';
import HelperListPage from './pages/HelperListPage';
import Footer from './components/Footer';
import BookAppointmentPage from './pages/BookAppointmentPage';
import ChatRoomPage from './pages/ChatRoomPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/sign-up-final-step"
          exact
          component={SignUpPasswordPage}
        />
        <Route path="/helper" exact component={LandingPageHelper} />
        <Route path="/service-options" exact component={ServiceOptionPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/find-helpers" component={HelperListPage} />
        <Route path="/book-appointment-form" component={BookAppointmentPage} />
        <Route path="/chatroom" exact component={ChatRoomPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
