import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignUpPasswordPage from './pages/SignUpPasswordPage';
import LandingPageHelper from './pages/LandingPageHelper';
import ServiceOptionPage from './pages/ServiceOptionPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import BookAppointmentPage from './pages/BookAppointmentPage';
import ChatRoomPage from './pages/ChatRoomPage';
import EndNavigatePage from './pages/EndNavigatePage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/home" exact element={<Navigate to="/"/>} />
        <Route
          path="/sign-up-final-step"
          exact
          element={<SignUpPasswordPage />}
        />
        <Route path="/helper" exact element={<LandingPageHelper />} />
        <Route path="/service-options" exact element={<ServiceOptionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/book-appointment-form"
          element={<BookAppointmentPage />}
        />
        <Route path="/choose-navigations" exact element={<EndNavigatePage />} />
        <Route path={"/chatroom"} exact element={<ChatRoomPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
