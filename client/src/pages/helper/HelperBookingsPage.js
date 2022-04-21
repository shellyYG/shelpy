import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getAllBookings,
} from '../../store/helper/helper-actions';

import { useNavigate, useSearchParams } from 'react-router-dom';
import BookingCard from '../../components/BookingCard';
import RefreshIcon from '../../components/Icons/RefreshIcon';

import DropDown from '../../components/Dropdown';
import { bookingStatusOptionsForHelper } from '../../store/options/service-options';
import { logLandOnPage } from '../../store/general/general-actions';


const HelperBookingsPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingStatusRef = useRef();
  const [searchParams] = useSearchParams();

  const { allBookings } = useSelector((state) => state.helper);

  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

  const [filteredBookingStatus, setFilteredBookingStatus] = useState('default');
  const [filteredBookings, setFilteredBookings] = useState(allBookings);

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  function handleRrefreshPage(e) {
    e.preventDefault(e);
    window.location.reload();
  }
  function handleToReferralPage(e) {
    e.preventDefault(e);
    let path = `/${currentLanguage}/helper/referrals`;
    if (window.location.search) path += window.location.search;
    navigate(path);
  }

  useEffect(() => {
    dispatch(getAllBookings({ helperUserId: props.helperUserId }));
  }, [props.helperUserId, props.helpeeUserId, dispatch]);

  useEffect(() => {
    if (filteredBookingStatus !== 'default') {
      const filteredItems = allBookings.filter(
        (b) => b.bookingStatus === filteredBookingStatus
      );
      setFilteredBookings(filteredItems);
    } else {
      setFilteredBookings(allBookings);
    }
  }, [allBookings, filteredBookingStatus]);

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
    <div className='section-left-align'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.helperName && (
          <h2 style={{ margin: '15px auto 0px' }}>
            {t('welcome_name', { name: props.helperName })}!
          </h2>
        )}
        {!props.helperName && (
          <h2 style={{ margin: '15px auto 0px' }}>{t('welcome')}</h2>
        )}
      </div>
      <div className='orderHistoryBtnWrapper'>
        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: 'auto' }}>{t('refresh_to_get_bookings')}</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>

      <div style={{ width: 'fit-content', margin: 'auto' }}>
        <DropDown
          selected={filteredBookingStatus}
          handleSelect={setFilteredBookingStatus}
          options={bookingStatusOptionsForHelper}
          selectRef={bookingStatusRef}
          titleColor='black'
          titleMarginLeft='8px'
        />
      </div>

      {filteredBookings && (
        <div className='task-container'>
          {(!filteredBookings || filteredBookings.length === 0) && (
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
                <button className='btn-contact' onClick={handleToReferralPage}>
                  {t('help_us_find_helpees')}
                </button>
              </div>
            </>
          )}

          {filteredBookings &&
            filteredBookings.map(
              (
                option // TODO: changed to orders
              ) => (
                <BookingCard
                  isHelpee={false}
                  key={option.id}
                  id={option.id}
                  helperId={option.helperId}
                  helpeeId={option.helpeeId}
                  helpeeUsername={option.helpeeUsername}
                  helperUsername={option.helperUsername}
                  partnerName={
                    props.isHelpee
                      ? option.helperUsername
                      : option.helpeeUsername
                  }
                  mainType={option.mainType}
                  secondType={option.secondType}
                  thirdType={option.thirdType}
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
                  appointmentTimeStamp={option.appointmentTimestamp}
                  timeZone={option.timeZone}
                  languages={option.languages}
                  isAnonymous={option.helpeeAnonymous}
                  notes={option.notes}
                  sharingTopicEN={option.sharingTopicEN}
                  questions={option.questions}
                  joinUrl={option.joinUrl}
                  introduction={option.introduction}
                  introductionEN={option.introductionEN}
                />
              )
            )}
        </div>
      )}
    </div>
  );
};

export default HelperBookingsPage;
