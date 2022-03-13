import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotentialCustomerCard from '../../components/PotentialCustomerCard';
import {
  getPotentialCustomers,
} from '../../store/helper/helper-actions';
import RefreshIcon from '../../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';

const HelperMatchedPartnerPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    allPotentialCustomers,
  } = useSelector((state) => state.helper);

  useEffect(() => {
    dispatch(getPotentialCustomers({ helperUserId: props.helperUserId }));
  }, [props.helperUserId, props.helpeeUserId, dispatch]);

  function handleRrefreshPage(e) {
    e.preventDefault(e);
    window.location.reload();
  }

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
          <div style={{ margin: 'auto' }}>{t('refresh_to_get_matches')}</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>

      {allPotentialCustomers && (
        <div className='task-container'>
          {!allPotentialCustomers ||
            (allPotentialCustomers.length === 0 && (
              <div
                className='history-card'
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  paddingLeft: '18px',
                  display: 'flex',
                }}
              >
                <p style={{ margin: 'auto' }}>{t('no_matched_customers')}</p>
              </div>
            ))}
          {allPotentialCustomers.map((option) => (
            <PotentialCustomerCard
              key={option.bookingId || `${option.requestId}-${option.offerId}`}
              helperAnonymous={option.helperAnonymous}
              helpeeAnonymous={option.helpeeAnonymous}
              helperId={props.helperUserId}
              helpeeId={option.helpeeId}
              helpeeUsername={option.helpeeUsername}
              helperUsername={option.helperUsername}
              partnerName={option.helpeeUsername}
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
              organization={option.organization}
              notes={option.notes || t('na')}
              introduction={option.introduction || t('na')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelperMatchedPartnerPage;
