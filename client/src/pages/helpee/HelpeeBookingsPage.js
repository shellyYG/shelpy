import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getAllBookings,
} from '../../store/helpee/helpee-actions';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../../components/BookingCard';
import RefreshIcon from '../../components/Icons/RefreshIcon';

import DropDown from '../../components/Dropdown';
import { bookingStatusOptionsForHelpee } from '../../store/options/service-options';


const HelpeeBookingsPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingStatusRef = useRef();

  const { allBookings } = useSelector((state) => state.helpee);

  const [filteredBookingStatus, setFilteredBookingStatus] = useState('default');
  const [filteredBookings, setFilteredBookings] = useState(allBookings);
  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

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

  useEffect(() => {
    dispatch(getAllBookings({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  useEffect(()=>{
    if (filteredBookingStatus !== 'default') {
      const filteredItems = allBookings.filter(
        (b) => b.bookingStatus === filteredBookingStatus
      );
      setFilteredBookings(filteredItems);
    } else {
      setFilteredBookings(allBookings);
    }
  },[allBookings, filteredBookingStatus])

  
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
      <div style={{ width: 'fit-content', margin: 'auto' }}>
        <DropDown
          selected={filteredBookingStatus}
          handleSelect={setFilteredBookingStatus}
          options={bookingStatusOptionsForHelpee}
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
                <button className='btn-contact' onClick={handleSearchHelpers}>
                  {t('book_helper_cta')}
                </button>
              </div>
            </>
          )}

          {filteredBookings &&
            filteredBookings.map((option) => (
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
                appointmentTimeStamp={option.appointmentTimestamp}
                timeZone={option.timeZone}
                languages={option.languages}
                isAnonymous={option.helperAnonymous}
                notes={option.notes}
                sharingTopicEN={option.sharingTopicEN}
                questions={option.questions}
                joinUrl={option.joinUrl}
                introduction={option.introduction}
                introductionEN={option.introductionEN}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default HelpeeBookingsPage;
