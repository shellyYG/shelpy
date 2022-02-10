import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

import HelpeeSignUpPasswordPage from './pages/helpee/HelpeeSignUpPasswordPage';
import HelperSignUpPasswordPage from './pages/helper/HelperSignUpPasswordPage';
import ChatRoomPage from './pages/ChatRoomPage';
import HelpeeHomePage from './pages/helpee/HelpeeHomePage';
import HelpeeDashboardPage from './pages/helpee/HelpeeDashboardPage';
import HelpeeSignInPage from './pages/helpee/HelpeeSignInPage';
import ErrorPage from './pages/ErrorPage';
import PreSignInPage from './pages/PreSignInPage';

import HelperHomePage from './pages/helper/HelperHomePage';
import HelperSignInPage from './pages/helper/HelperSignInPage';

import JobFormPage from './pages/JobFormPage';
import SelectJobOrUniPage from './pages/SelectJobOrUniPage';
import UniFormPage from './pages/UniFormPage';
import SelfEmployedPage from './pages/SelfEmployedPage';
import FinalFormPage from './pages/FinalFormPage';

import { getHelpeeAuthStatus } from './store/helpee/helpee-actions';
import { getHelperAuthStatus } from './store/helper/helper-actions';
import BasicFormPage from './pages/BasicFormPage';
import HelperAddServicePage from './pages/helper/HelperAddServicePage';
import HelperDashboardPage from './pages/helper/HelperDashboardPage';
import BookingConfirmPage from './pages/BookingConfirmPage';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHelpeeAuthStatus());
    dispatch(getHelperAuthStatus());
  }, [dispatch]);
  const { helpeeUserId, helpeeName, isHelpeeAuthenticated } = useSelector((state) => state.helpee);
  const { helperUserId, helperName, isHelperAuthenticated } = useSelector((state) => state.helper);
  console.log('@App: ', isHelperAuthenticated, helperName);
  return (
    <Router>
      <NavBar
        isHelpeeAuthenticated={isHelpeeAuthenticated}
        isHelperAuthenticated={isHelperAuthenticated}
      />
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
          path='/helpee/service-types'
          element={
            isHelpeeAuthenticated ? (
              <SelectJobOrUniPage isHelpee={true} />
            ) : (
              <PreSignInPage isHelpee={true} />
            )
          }
        />
        <Route
          path='/helper/service-types'
          element={
            isHelperAuthenticated ? (
              <SelectJobOrUniPage isHelpee={false} />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route
          path='/helpee/job-form'
          element={
            isHelpeeAuthenticated ? (
              <JobFormPage isHelpee={true} />
            ) : (
              <PreSignInPage isHelpee={true} />
            )
          }
        />
        <Route
          path='/helper/job-form'
          element={
            isHelperAuthenticated ? (
              <JobFormPage isHelpee={false} />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route
          path='/helpee/uni-form'
          element={
            isHelpeeAuthenticated ? (
              <UniFormPage isHelpee={true} />
            ) : (
              <PreSignInPage isHelpee={true} />
            )
          }
        />
        <Route
          path='/helper/uni-form'
          element={
            isHelperAuthenticated ? (
              <UniFormPage isHelpee={false} />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route
          path='/helpee/self-employed-form'
          element={
            isHelpeeAuthenticated ? (
              <SelfEmployedPage isHelpee={true} />
            ) : (
              <PreSignInPage isHelpee={true} />
            )
          }
        />
        <Route
          path='/helper/self-employed-form'
          element={
            isHelperAuthenticated ? (
              <SelfEmployedPage isHelpee={false} />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route
          path='/helpee/final-form'
          element={
            isHelpeeAuthenticated ? (
              <FinalFormPage isHelpee={true} />
            ) : (
              <PreSignInPage isHelpee={true} />
            )
          }
        />
        <Route
          path='/helper/final-form'
          element={
            isHelperAuthenticated ? (
              <FinalFormPage isHelpee={false} />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route
          path={'/helpee/dashboard'}
          element={
            isHelpeeAuthenticated ? (
              <HelpeeDashboardPage
                helpeeUserId={helpeeUserId}
                helpeeName={helpeeName}
              />
            ) : (
              <PreSignInPage isHelpee={true} />
            )
          }
        />
        <Route
          path={'/helper/dashboard'}
          element={
            isHelperAuthenticated ? (
              <HelperDashboardPage
                helperUserId={helperUserId}
                helperName={helperName}
              />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route
          path={'/helpee/chatroom'}
          element={
            isHelpeeAuthenticated ? (
              <ChatRoomPage isHelpee={true} />
            ) : (
              <PreSignInPage isHelpee={true} />
            )
          }
        />
        <Route
          path={'/helpee/book-helper'}
          element={<BookingConfirmPage isHelpee={true} />}
        />
        <Route
          path={'/helper/confirm-booking'}
          element={<BookingConfirmPage isHelpee={false} />}
        />
        <Route
          path={'/helper/chatroom'}
          element={
            isHelperAuthenticated ? (
              <ChatRoomPage isHelpee={false} />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route
          path={'/helper/basic-form'}
          element={
            <BasicFormPage isHelpee={false} helperUserId={helperUserId} />
          }
        />
        <Route
          path={'/helpee/basic-form'}
          element={
            <BasicFormPage isHelpee={true} helpeeUserId={helpeeUserId} />
          }
        />
        <Route
          path={'/helper/add-service'}
          element={
            isHelperAuthenticated ? (
              <HelperAddServicePage />
            ) : (
              <PreSignInPage isHelpee={false} />
            )
          }
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
