import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

import HelpeeSignUpPasswordPage from './pages/helpee/HelpeeSignUpPasswordPage';
import HelperSignUpPasswordPage from './pages/helper/HelperSignUpPasswordPage';
import HelpeeChatRoomPage from './pages/HelpeeChatRoomPage';
import HelpeeHomePage from './pages/helpee/HelpeeHomePage';
import HelpeeOrderHistoryPage from './pages/helpee/HelpeeOrderHistoryPage';
import HelperListPage from './pages/helpee/HelpeeOrderHelperListPage';
import HelpeeSignInPage from './pages/helpee/HelpeeSignInPage';
import ErrorPage from './pages/ErrorPage';
import HelpeePreSignInPage from './pages/helpee/HelpeePreSignInPage';

import HelpeeJobFormPage from './pages/helpee/HelpeeJobFormPage';
import HelpeeSelectJobOrUniPage from './pages/helpee/HelpeeSelectJobOrUniPage';
import HelpeeUniFormPage from './pages/helpee/HelpeeUniFormPage';
import HelpeeSelfEmployedPage from './pages/helpee/HelpeeSelfEmployedPage';
import HelpeeFinalFormPage from './pages/helpee/HelpeeFinalFormPage';
import HelperHomePage from './pages/helper/HelperHomePage';
import HelperSignInPage from './pages/helper/HelperSignInPage';

import { getAuthStatus } from './store/helpee/helpee-actions';
import HelperBasicFormPage from './pages/helper/HelperBasicFormPage';


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
        <Route path='/about' element={<AboutPage />} />
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route
          path='/home'
          element={<HelpeeHomePage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/helper/home'
          element={<HelperHomePage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/helpee/sign-up-final-step'
          element={<HelpeeSignUpPasswordPage />}
        />
        <Route
          path='/helper/sign-up-final-step'
          element={<HelperSignUpPasswordPage />}
        />
        <Route path='/helpee/sign-in' element={<HelpeeSignInPage />} />
        <Route path='/helper/sign-in' element={<HelperSignInPage />} />

        <Route
          path='/helpee/book-a-helper'
          element={
            isAuthenticated ? (
              <HelpeeSelectJobOrUniPage />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path='/helpee/job-form'
          element={
            isAuthenticated ? <HelpeeJobFormPage /> : <HelpeePreSignInPage />
          }
        />
        <Route
          path='/helpee/uni-form'
          element={
            isAuthenticated ? <HelpeeUniFormPage /> : <HelpeePreSignInPage />
          }
        />
        <Route
          path='/helpee/self-employed-form'
          element={
            isAuthenticated ? (
              <HelpeeSelfEmployedPage />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path='/helpee/final-form'
          element={
            isAuthenticated ? <HelpeeFinalFormPage /> : <HelpeePreSignInPage />
          }
        />
        <Route
          path={'/helpee/order-history'}
          element={
            isAuthenticated ? (
              <HelpeeOrderHistoryPage userId={userId} />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path={'/helpee/order/helper-lists'}
          element={
            isAuthenticated ? <HelperListPage /> : <HelpeePreSignInPage />
          }
        />
        <Route path={'/helpee/chatroom'} element={<HelpeeChatRoomPage />} />
        <Route path={'/helper/basic-form'} element={<HelperBasicFormPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
