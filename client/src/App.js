import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
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
import PreSignInPage from './pages/PreSignInPage';
import { getAuthStatus } from './store/helpee/helpee-actions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthStatus());
  }, [dispatch]);
  const { userId, isAuthenticated } = useSelector((state) => state.helpee);
  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route
          path='/home'
          element={<HomePage isAuthenticated={isAuthenticated} />}
        />
        <Route path='/sign-up-final-step' element={<SignUpPasswordPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/helper' element={<SignUpPageHelper />} />
        <Route path='/service-options' element={<ServiceOptionPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route
          path='/book-appointment-form'
          element={
            isAuthenticated ? <BookAppointmentPage /> : <PreSignInPage />
          }
        />
        <Route path={'/chatroom'} element={<ChatRoomPage />} />
        <Route
          path={'/order-history'}
          element={
            isAuthenticated ? (
              <OrderHistoryPage userId={userId} />
            ) : (
              <PreSignInPage />
            )
          }
        />
        <Route
          path={'/helper-lists'}
          element={isAuthenticated ? <HelperListPage /> : <PreSignInPage />}
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
