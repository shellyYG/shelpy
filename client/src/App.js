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
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route
          path='/sign-up-final-step'
          element={<SignUpPasswordPage />}
        />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/helper' element={<SignUpPageHelper />} />
        <Route path='/service-options' element={<ServiceOptionPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route
          path='/book-appointment-form'
          element={<BookAppointmentPage />}
        />
        <Route path={'/chatroom'} element={<ChatRoomPage />} />
        <Route path={'/order-history'} element={<OrderHistoryPage />} />
        <Route path={'/helper-lists'} element={<HelperListPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
