import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBookings,
} from '../../store/helpee/helpee-actions';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../../components/BookingCard';
import RefreshIcon from '../../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';


const HelpeeBookingsPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const { allBookings } = useSelector(
    (state) => state.helpee
  );

  useEffect(() => {
    dispatch(getAllBookings({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  function handleSearchHelpers(e) {
    e.preventDefault(e);
    let path = `/${currentLanguage}/marketing/offers`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }

  function handleRrefreshPage(e) {
    e.preventDefault(e);
    window.location.reload();
  }
  return (
    <div className='section-left-align'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.helpeeName && (
          <h2 style={{ margin: '15px auto 0px' }}>
            {t('welcome_name', { name: props.helpeeName })}!
          </h2>
        )}
        {!props.helpeeName && (
          <h2 style={{ margin: '15px auto 0px' }}>{t('welcome')}</h2>
        )}
      </div>
      <div className='orderHistoryBtnWrapper'>
        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: 'auto' }}>{t('refresh_to_get_bookings')}</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>
      <div className='task-container'></div>

      {allBookings && (
        <div className='task-container'>
          {(!allBookings || allBookings.length === 0) && (
            <>
              <div
                className='history-card'
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  paddingLeft: '18px',
                }}
              >
                <p style={{ margin: 'auto' }}>{t('no_bookings')}</p>
              </div>
              <div style={{ margin: 'auto' }}>
                <button className='btn-contact' onClick={handleSearchHelpers}>
                  {t('book_helper_cta')}
                </button>
              </div>
            </>
          )}

          {allBookings.map(
            (
              option // TODO: changed to orders
            ) => (
              <BookingCard
                isHelpee={true}
                key={option.id}
                id={option.id}
                helpeeEmail={option.helpeeEmail}
                helperId={option.helperId}
                helpeeId={option.helpeeId}
                helpeeUsername={option.helpeeUsername}
                helperUsername={option.helperUsername}
                partnerName={
                  props.isHelpee ? option.helperUsername : option.helpeeUsername
                }
                mainType={option.mainType}
                secondType={option.secondType}
                thirdType={option.thirdType}
                fourthType={option.fourthType}
                profilePicPath={option.profilePicPath}
                country={option.country}
                requestId={option.requestId}
                offerId={option.offerId}
                price={option.price}
                duration={option.duration}
                bookingId={option.bookingId}
                bookingStatus={option.bookingStatus}
                appointmentDate={option.appointmentDate}
                appointmentTime={option.appointmentTime}
                languages={option.languages}
                isAnonymous={option.helperAnonymous}
                notes={option.notes}
                questions={option.questions}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default HelpeeBookingsPage;
