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

import { getHelpeeAuthStatus } from './store/helpee/helpee-actions';
import { getHelperAuthStatus } from './store/helper/helper-actions';
import HelperBasicFormPage from './pages/helper/HelperBasicFormPage';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHelpeeAuthStatus());
    dispatch(getHelperAuthStatus());
  }, [dispatch]);
  const { helpeeUserId, isHelpeeAuthenticated } = useSelector((state) => state.helpee);
  const { helperUserId, isHelperAuthenticated } = useSelector((state) => state.helper);
  return (
    <Router>
      <NavBar isHelpeeAuthenticated={isHelpeeAuthenticated} />
      <Routes>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route
          path='/home'
          element={
            <HelpeeHomePage isHelpeeAuthenticated={isHelpeeAuthenticated} />
          }
        />
        <Route
          path='/helper/home'
          element={
            <HelperHomePage isHelperAuthenticated={isHelperAuthenticated} />
          }
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
            isHelpeeAuthenticated ? (
              <HelpeeSelectJobOrUniPage />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path='/helpee/job-form'
          element={
            isHelpeeAuthenticated ? (
              <HelpeeJobFormPage helpeeUserId={helpeeUserId} />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path='/helpee/uni-form'
          element={
            isHelpeeAuthenticated ? (
              <HelpeeUniFormPage helpeeUserId={helpeeUserId} />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path='/helpee/self-employed-form'
          element={
            isHelpeeAuthenticated ? (
              <HelpeeSelfEmployedPage helpeeUserId={helpeeUserId} />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path='/helpee/final-form'
          element={
            isHelpeeAuthenticated ? (
              <HelpeeFinalFormPage helpeeUserId={helpeeUserId} />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path={'/helpee/order-history'}
          element={
            isHelpeeAuthenticated ? (
              <HelpeeOrderHistoryPage helpeeUserId={helpeeUserId} />
            ) : (
              <HelpeePreSignInPage />
            )
          }
        />
        <Route
          path={'/helpee/order/helper-lists'}
          element={
            isHelpeeAuthenticated ? <HelperListPage /> : <HelpeePreSignInPage />
          }
        />
        <Route path={'/helpee/chatroom'} element={<HelpeeChatRoomPage />} />
        <Route
          path={'/helper/basic-form'}
          element={<HelperBasicFormPage helperUserId={helperUserId} />}
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
