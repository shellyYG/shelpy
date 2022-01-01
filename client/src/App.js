import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUpPasswordPage from './pages/SignUpPasswordPage';
import SignUpPageHelper from "./pages/SignUpPageHelper";
import ServiceOptionPage from './pages/ServiceOptionPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import BookAppointmentPage from './pages/BookAppointmentPage';
import ChatRoomPage from './pages/ChatRoomPage';
import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import HelperListPage from "./pages/HelperListPage";
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/home" />} />
        <Route path="/home" exact element={<HomePage />} />
        <Route
          path="/sign-up-final-step"
          exact
          element={<SignUpPasswordPage />}
        />
        <Route
          path="/sign-in"
          exact
          element={<SignInPage />}
        />
        <Route path="/helper" exact element={<SignUpPageHelper />} />
        <Route path="/service-options" exact element={<ServiceOptionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/book-appointment-form"
          element={<BookAppointmentPage />}
        />
        <Route path={"/chatroom"} exact element={<ChatRoomPage />} />
        <Route path={"/order-history"} exact element={<OrderHistoryPage />} />
        <Route path={"/helper-lists"} exact element={<HelperListPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
