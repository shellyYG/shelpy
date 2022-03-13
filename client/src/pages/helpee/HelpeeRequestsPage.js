import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders,
} from '../../store/helpee/helpee-actions';
import { useNavigate } from 'react-router-dom';
import RequestCard from '../../components/RequestCard';
import RefreshIcon from '../../components/Icons/RefreshIcon';
import { useTranslation } from 'react-i18next';

const HelpeeRequestsPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const { allOrders } =
    useSelector((state) => state.helpee);

  useEffect(() => {
    dispatch(getAllOrders({ helpeeUserId: props.helpeeUserId }));
  }, [props.helpeeUserId, dispatch]);

  function handleAddRequest(e) {
    e.preventDefault(e);
    let path = `/${currentLanguage}/helpee/service-types`;
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
          <div style={{ margin: 'auto' }}>{t('refresh_to_get_requests')}</div>
          <RefreshIcon onClick={handleRrefreshPage} />
        </div>
      </div>
      <div className='task-container'></div>

      {allOrders && (
        <div className='task-container'>
          {(!allOrders || allOrders.length === 0) && (
            <div
              className='history-card'
              style={{ boxShadow: 'none', border: 'none', paddingLeft: '18px' }}
            >
              <p style={{ margin: 'auto' }}>{t('no_requests')}</p>
            </div>
          )}
          <div
            className='history-card'
            style={{ boxShadow: 'none', border: 'none' }}
          >
            <div style={{ margin: 'auto' }}>
              <button className='btn-contact' onClick={handleAddRequest}>
                {t('add_request_cta')}
              </button>
            </div>
          </div>
          {allOrders.map((option) => (
            <RequestCard
              key={option.id}
              id={option.id}
              mainType={option.mainType}
              secondType={option.secondType}
              thirdType={option.thirdType}
              fourthType={option.fourthType}
              country={option.country}
              helpeeId={props.helpeeUserId}
              helpeeName={option.helpeeName}
              notes={option.notes}
              profilePicPath={option.profilePicPath}
              languages={option.languages}
              isAnonymous={option.isAnonymous}
              introduction={option.introduction}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpeeRequestsPage;
