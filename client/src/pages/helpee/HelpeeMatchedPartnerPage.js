import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotentialHelperCard from '../../components/PotentialHelperCard';
import {
  getPotentialHelpers,
} from '../../store/helpee/helpee-actions';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '../../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';

const HelpeeMatchedPartnerPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const { allPotentialHelpers } =
    useSelector((state) => state.helpee);

  useEffect(() => {
    dispatch(getPotentialHelpers({ helpeeUserId: props.helpeeUserId }));
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
            {t('matched_helper_title')}
          </h2>
        )}
        {!props.helpeeName && (
          <h2 style={{ margin: '15px auto 0px' }}>{t('welcome')}</h2>
        )}
      </div>
      <div className='orderHistoryBtnWrapper'>
        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: 'auto' }}>{t('refresh_to_get_matches')}</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>
      <div className='task-container'></div>
      {allPotentialHelpers && (
        <div className='task-container'>
          {!allPotentialHelpers ||
            (allPotentialHelpers.length === 0 && (
              <div
                className='history-card'
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  paddingLeft: '18px',
                  display: 'flex',
                }}
              >
                <p style={{ margin: 'auto' }}>{t('no_matched_helpers')}</p>
              </div>
            ))}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <div style={{ margin: 'auto' }}>
              <button className='btn-contact' onClick={handleSearchHelpers}>
                {t('search_helper_cta')}
              </button>
            </div>
          </div>

          {allPotentialHelpers.map((option) => (
            <PotentialHelperCard
              key={option.bookingId || `${option.requestId}-${option.offerId}`}
              helperAnonymous={option.helperAnonymous}
              helpeeAnonymous={option.helpeeAnonymous}
              helpeeId={props.helpeeUserId}
              helperId={option.helperId}
              helpeeUsername={option.helpeeUsername}
              helperUsername={option.helperUsername}
              partnerName={option.helperUsername}
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
              languages={option.languages}
              notes={option.notes || t('na')}
              introduction={option.introduction || t('na')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpeeMatchedPartnerPage;
