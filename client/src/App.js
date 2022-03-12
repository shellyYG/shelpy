import './App.css';
import { useEffect, Suspense } from 'react';
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

import { getHelpeeAuthStatus } from './store/helpee/helpee-actions';
import { getHelperAuthStatus } from './store/helper/helper-actions';
import BasicFormPage from './pages/BasicFormPage';
import HelperAddServicePage from './pages/helper/HelperAddServicePage';
import HelperDashboardPage from './pages/helper/HelperDashboardPage';
import BookingConfirmPage from './pages/BookingConfirmPage';
import EmailConfirmPage from './pages/EmailConfirmPage';
import HelpeeForgetPasswordPage from './pages/helpee/HelpeeForgetPaswordPage';
import PasswordResetPage from './pages/PasswordResetPage';
import PasswordResetPrePage from './pages/PasswordResetPrePage';
import HelperForgetPasswordPage from './pages/helper/HelperForgetPasswordPage';
import MarketingPage from './pages/MarketingPage';
import EmailUnSubscriptionPage from './pages/EmailUnSubscriptionPage';
import PayPage from './pages/PayPage';
import ImpressumPage from './pages/ImpressumPage';
import ContactPage from './pages/ContactPage';
import HelperContractPage from './pages/HelperContractPags';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionaPage from './pages/TermsConditionPage';
import SelectSignInRolePage from './pages/SelectSignInRolePage';
import HelperGuidePage from './pages/HelperGuidePage';
import ChatroomPreLandingPage from './pages/ChatroomPreLandingPage';
import DashboardPreLandingPage from './pages/DashboardPreLandingPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHelpeeAuthStatus());
    dispatch(getHelperAuthStatus());
  }, [dispatch]);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  let currentLanguage = routeParts[1];
  const { helpeeUserId, helpeeName, isHelpeeAuthenticated } = useSelector((state) => state.helpee);
  const { helperUserId, helperName, isHelperAuthenticated } = useSelector((state) => state.helper);
  if (!currentLanguage) {
    currentLanguage = 'en';
  }
    return (
      <Suspense fallback={null}>
        <Router>
          <NavBar
            isHelpeeAuthenticated={isHelpeeAuthenticated}
            isHelperAuthenticated={isHelperAuthenticated}
          />
          <Routes>
            <Route path={`/:locale/about`} element={<AboutPage />} />
            <Route path={`/:locale/impressum`} element={<ImpressumPage />} />
            <Route path={`/:locale/contact`} element={<ContactPage />} />
            <Route
              path={`/:locale/helper-terms`}
              element={<HelperContractPage />}
            />
            <Route path={`/:locale/privacy`} element={<PrivacyPolicyPage />} />
            <Route path={`/:locale/terms`} element={<TermsConditionaPage />} />
            <Route
              path={`/:locale/marketing/offers`}
              element={
                <MarketingPage
                  helpeeId={helpeeUserId}
                  helpeeUsername={helpeeName}
                  isHelpeeAuthenticated={isHelpeeAuthenticated}
                />
              }
            />
            <Route
              path={`/`}
              element={
                <Navigate replace to={`/${currentLanguage}/helpee/home`} />
              }
            />
            <Route
              path={`/:locale/home`}
              element={
                <HelpeeHomePage isHelpeeAuthenticated={isHelpeeAuthenticated} />
              }
            />
            <Route
              path={`/:locale/helpee/home`}
              element={
                <HelpeeHomePage isHelpeeAuthenticated={isHelpeeAuthenticated} />
              }
            />
            <Route
              path={`/:locale/helper/home`}
              element={
                <HelperHomePage isHelperAuthenticated={isHelperAuthenticated} />
              }
            />
            <Route
              path={`/:locale/unsubscribe`}
              element={<EmailUnSubscriptionPage />}
            />

            <Route
              path={`/:locale/helpee/sign-up-final-step`}
              element={<HelpeeSignUpPasswordPage />}
            />
            <Route
              path={`/:locale/helper/sign-up-final-step`}
              element={<HelperSignUpPasswordPage />}
            />
            <Route
              path={`/:locale/sign-in`}
              element={<SelectSignInRolePage />}
            />
            <Route
              path={`/:locale/helpee/sign-in`}
              element={<HelpeeSignInPage />}
            />
            <Route
              path={`/:locale/helpee/forget-password`}
              element={<HelpeeForgetPasswordPage />}
            />
            <Route
              path={`/:locale/helper/forget-password`}
              element={<HelperForgetPasswordPage />}
            />
            <Route
              path={`/:locale/helpee/password/pre/reset`}
              element={<PasswordResetPrePage isHelpee={true} />}
            />
            <Route
              path={`/:locale/helper/password/pre/reset`}
              element={<PasswordResetPrePage isHelpee={false} />}
            />
            <Route
              path={`/:locale/helper/access-chatroom`}
              element={<ChatroomPreLandingPage isHelpee={false} />}
            />
            <Route
              path={`/:locale/helpee/access-chatroom`}
              element={<ChatroomPreLandingPage isHelpee={true} />}
            />
            <Route
              path={`/:locale/helper/access-dashboard`}
              element={<DashboardPreLandingPage isHelpee={false} />}
            />
            <Route
              path={`/:locale/helpee/access-dashboard`}
              element={<DashboardPreLandingPage isHelpee={true} />}
            />
            <Route
              path={`/:locale/helpee/password/reset/${process.env.REACT_APP_PASS_RESET_URL}`}
              element={<PasswordResetPage isHelpee={true} />}
            />
            <Route
              path={`/:locale/helper/password/reset/${process.env.REACT_APP_PASS_RESET_URL}`}
              element={<PasswordResetPage isHelpee={false} />}
            />
            <Route
              path={`/:locale/helper/sign-in`}
              element={<HelperSignInPage />}
            />

            <Route
              path={`/:locale/helpee/service-types`}
              element={
                isHelpeeAuthenticated ? (
                  <SelectJobOrUniPage isHelpee={true} />
                ) : (
                  <PreSignInPage isHelpee={true} />
                )
              }
            />
            <Route
              path={`/:locale/helper/service-types`}
              element={
                isHelperAuthenticated ? (
                  <SelectJobOrUniPage isHelpee={false} />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route
              path={`/:locale/helpee/job-form`}
              element={
                isHelpeeAuthenticated ? (
                  <JobFormPage isHelpee={true} helpeeUserId={helpeeUserId} />
                ) : (
                  <PreSignInPage isHelpee={true} />
                )
              }
            />
            <Route
              path={`/:locale/helper/job-form`}
              element={
                isHelperAuthenticated ? (
                  <JobFormPage isHelpee={false} helperUserId={helperUserId} />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route
              path={`/:locale/helpee/uni-form`}
              element={
                isHelpeeAuthenticated ? (
                  <UniFormPage isHelpee={true} helpeeUserId={helpeeUserId} />
                ) : (
                  <PreSignInPage isHelpee={true} />
                )
              }
            />
            <Route
              path={`/:locale/helper/uni-form`}
              element={
                isHelperAuthenticated ? (
                  <UniFormPage isHelpee={false} helperUserId={helperUserId} />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route
              path={`/:locale/helpee/self-employed-form`}
              element={
                isHelpeeAuthenticated ? (
                  <SelfEmployedPage
                    isHelpee={true}
                    helpeeUserId={helpeeUserId}
                  />
                ) : (
                  <PreSignInPage isHelpee={true} />
                )
              }
            />
            <Route
              path={`/:locale/helper/self-employed-form`}
              element={
                isHelperAuthenticated ? (
                  <SelfEmployedPage
                    isHelpee={false}
                    helperUserId={helperUserId}
                  />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route
              path={`/:locale/helpee/dashboard`}
              element={
                isHelpeeAuthenticated ? (
                  <HelpeeDashboardPage
                    isHelpee={true}
                    helpeeUserId={helpeeUserId}
                    helpeeName={helpeeName}
                  />
                ) : (
                  <PreSignInPage isHelpee={true} />
                )
              }
            />
            <Route
              path={`/:locale/helper/dashboard`}
              element={
                isHelperAuthenticated ? (
                  <HelperDashboardPage
                    isHelpee={false}
                    helperUserId={helperUserId}
                    helperName={helperName}
                  />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route
              path={`/:locale/helpee/chatroom`}
              element={
                isHelpeeAuthenticated ? (
                  <ChatRoomPage isHelpee={true} helpeeUserId={helpeeUserId} />
                ) : (
                  <PreSignInPage isHelpee={true} />
                )
              }
            />
            <Route
              path={`/:locale/helpee/update-booking`}
              element={<BookingConfirmPage isHelpee={true} />}
            />
            <Route
              path={`/:locale/helper/confirm-booking`}
              element={<BookingConfirmPage isHelpee={false} />}
            />
            <Route
              path={`/:locale/helpee/email/confirmation`}
              element={<EmailConfirmPage isHelpee={true} />}
            />
            <Route
              path={`/:locale/helper/email/confirmation`}
              element={<EmailConfirmPage isHelpee={false} />}
            />
            <Route
              path={`/:locale/helper/chatroom`}
              element={
                isHelperAuthenticated ? (
                  <ChatRoomPage isHelpee={false} helperUserId={helperUserId} />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route
              path={`/:locale/helper/basic-form`}
              element={
                <BasicFormPage isHelpee={false} helperUserId={helperUserId} />
              }
            />
            <Route
              path={`/:locale/helpee/basic-form`}
              element={
                <BasicFormPage isHelpee={true} helpeeUserId={helpeeUserId} />
              }
            />
            <Route
              path={`/:locale/helper/add-service`}
              element={
                isHelperAuthenticated ? (
                  <HelperAddServicePage />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route path={`/:locale/pay`} element={<PayPage />} />
            <Route
              path={`/:locale/helper/guidance`}
              element={<HelperGuidePage />}
            />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    );
}

export default App;
