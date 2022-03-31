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
import HelpeeBookingsPage from './pages/helpee/HelpeeBookingsPage';
import HelpeeSignInPage from './pages/helpee/HelpeeSignInPage';
import ErrorPage from './pages/ErrorPage';
import PreSignInPage from './pages/PreSignInPage';

import HelperHomePage from './pages/helper/HelperHomePage';
import HelperSignInPage from './pages/helper/HelperSignInPage';

import JobFormPage from './pages/JobFormPage';
import SelectJobOrUniPage from './pages/SelectJobOrUniPage';
import UniFormPage from './pages/UniFormPage';
import SelfEmployedPage from './pages/SelfEmployedPage';
import LifeSharingFormPage from './pages/LifeSharingFormPage';

import RatePartnerPage from './pages/RatePartnerPage';

import { getHelpeeAuthStatus } from './store/helpee/helpee-actions';
import { getHelperAuthStatus } from './store/helper/helper-actions';
import BasicFormPage from './pages/BasicFormPage';
import HelperAddServicePage from './pages/helper/HelperAddServicePage';
import HelperBookingsPage from './pages/helper/HelperBookingsPage';
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
import HelperContractPage from './pages/HelperContractPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionaPage from './pages/TermsConditionPage';
import SelectSignInRolePage from './pages/SelectSignInRolePage';
import HowItWorksPage from './pages/HowItWorksPage';
import ChatroomPreLandingPage from './pages/ChatroomPreLandingPage';
import DashboardPreLandingPage from './pages/DashboardPreLandingPage';
import HelpeeMatchedPartnerPage from './pages/helpee/HelpeeMatchedPartnerPage';
import HelperMatchedPartnerPage from './pages/helper/HelperMatchedPartnerPage';
import HelpeeRequestsPage from './pages/helpee/HelpeeRequestsPage';
import HelperOffersPage from './pages/helper/HelperOffersPage';
import ReferralPage from './pages/ReferralPage';
import HelperSetPayPalPage from './pages/helper/HelperSetPayPalPage';
import HelpeeGuidePage from './pages/helpee/HelpeeGuidePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHelpeeAuthStatus());
    dispatch(getHelperAuthStatus());
  }, [dispatch]);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  let currentLanguage = routeParts[1];
  const { helpeeUserId, helpeeName, isHelpeeAuthenticated, helpeeStatus } = useSelector((state) => state.helpee);
  const { helperUserId, helperName, isHelperAuthenticated, helperStatus } =
    useSelector((state) => state.helper);
  
  if (!currentLanguage) {
    currentLanguage = 'en';
  }
    return (
      <Suspense fallback={null}>
        <Router>
          <NavBar
            isHelpeeAuthenticated={isHelpeeAuthenticated}
            isHelperAuthenticated={isHelperAuthenticated}
            helperStatus={helperStatus}
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
              path={`/:locale/helpee/referrals`}
              element={
                <ReferralPage
                  isHelpee={true}
                  helpeeId={helpeeUserId}
                  helpeeUsername={helpeeName}
                  isHelpeeAuthenticated={isHelpeeAuthenticated}
                />
              }
            />
            <Route
              path={`/:locale/helper/referrals`}
              element={
                <ReferralPage
                  isHelpee={false}
                  helperId={helperUserId}
                  helperUsername={helperName}
                  isHelperAuthenticated={isHelperAuthenticated}
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
              path={`/:locale/helper/paypal-account`}
              element={
                isHelperAuthenticated ? (
                  <HelperSetPayPalPage helperId={helperUserId} />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
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
              path={`/:locale/helpee/life-form`}
              element={
                isHelpeeAuthenticated ? (
                  <LifeSharingFormPage
                    isHelpee={true}
                    helpeeUserId={helpeeUserId}
                  />
                ) : (
                  <PreSignInPage isHelpee={true} />
                )
              }
            />
            <Route
              path={`/:locale/helper/life-form`}
              element={
                isHelperAuthenticated ? (
                  <LifeSharingFormPage
                    isHelpee={false}
                    helperUserId={helperUserId}
                  />
                ) : (
                  <PreSignInPage isHelpee={false} />
                )
              }
            />
            <Route
              path={`/:locale/helpee/bookings`}
              element={
                isHelpeeAuthenticated ? (
                  <HelpeeBookingsPage
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
              path={`/:locale/helper/bookings`}
              element={
                isHelperAuthenticated ? (
                  <HelperBookingsPage
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
              path={`/:locale/helpee/partners`}
              element={
                isHelpeeAuthenticated ? (
                  <HelpeeMatchedPartnerPage
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
              path={`/:locale/helper/partners`}
              element={
                isHelperAuthenticated ? (
                  <HelperMatchedPartnerPage
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
              path={`/:locale/helpee/items`}
              element={
                isHelpeeAuthenticated ? (
                  <HelpeeRequestsPage
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
              path={`/:locale/helper/items`}
              element={
                isHelperAuthenticated ? (
                  <HelperOffersPage
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
              element={<HowItWorksPage />}
            />
            <Route
              path={`/:locale/helpee/guidance`}
              element={<HowItWorksPage />}
            />
            <Route
              path={`/:locale/helpee/user-guide`}
              element={<HelpeeGuidePage />}
            />
            <Route
              path={`/:locale/helper/user-guide`}
              element={<HelpeeGuidePage />}
            />
            <Route
              path={`/:locale/helper/rate-partner`}
              element={
                <RatePartnerPage isHelpee={false} helperUserId={helperUserId} />
              }
            />
            <Route
              path={`/:locale/helpee/rate-partner`}
              element={
                <RatePartnerPage isHelpee={true} helpeeUserId={helpeeUserId} />
              }
            />
            <Route
              path={`/:locale/helper/profile`}
              element={
                <ProfilePage isHelpee={false} helperUserId={helperUserId} />
              }
            />
            <Route
              path={`/:locale/helpee/profile`}
              element={
                <ProfilePage isHelpee={true} helpeeUserId={helpeeUserId} />
              }
            />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    );
}

export default App;
