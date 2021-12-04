// export default App;
import React from 'react';
import './App.css';
// import { useSelector, useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route
          path="/sign-up-final-step"
          exact
          component={SignUpPasswordPage}
        />
        <Route path="/helper" exact element={<LandingPageHelper />} />
        <Route path="/service-options" exact element={<ServiceOptionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/find-helpers" element={<HelperListPage />} />
        <Route
          path="/book-appointment-form"
          element={<BookAppointmentPage />}
        />
        <Route
          path={'/chatroom'}
          exact
          element={<ChatRoomPage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
