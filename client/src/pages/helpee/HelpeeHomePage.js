import '../../App.css';
import HelpeeSignUpPage from './HelpeeSignUpPage';
import HelpeeLoggedInHomePage from './HelpeeLoggedInHomePage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logLandOnPage } from '../../store/general/general-actions';
import { useSearchParams } from 'react-router-dom';

const HelpeeHomePage = (props) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');
  const refId = searchParams.get('refId');
  useEffect(() => {
    const today = new Date();
    dispatch(
      logLandOnPage({
        currentPathname: window.location.href,
        providerId,
        offerId,
        refId,
        viewTimeStamp: Date.now(),
        viewTime:
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds(),
        viewDate: today.toISOString().slice(0, 10),
      })
    );
  }, [providerId, offerId, refId, dispatch]);
  return (
    <>
      {props.isHelpeeAuthenticated && <HelpeeLoggedInHomePage />}
      {!props.isHelpeeAuthenticated && <HelpeeSignUpPage />}
    </>
  );
};

export default HelpeeHomePage;
