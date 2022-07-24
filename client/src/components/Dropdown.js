import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  onClickUpdateFilterCountry,
  onClickUpdateFilterMainType,
  onClickUpdateFilterSecondType,
  onClickUpdatePage,
} from '../store/general/general-actions';

function DropDown(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPathname = window.location.pathname.replace(/\/+$/, '');
  const routeParts = currentPathname.split('/');
  const currentLanguage = routeParts[1];

  const refId = searchParams.get('refId');
  const providerId = searchParams.get('providerId');
  const offerId = searchParams.get('offerId');

  const { page, filterCountry, filterMainType, filterSecondType } = useSelector(
    (state) => state.general
  );

  const handleSelect = (e) => {
    props.handleSelect(e.target.value);
    if (props.setGlobalValue) {
      let data;
      try {
        switch (props.globalValueType) {
          case 'country':
            data = {
              filterCountry: e.target.value,
            };
            dispatch(onClickUpdateFilterCountry(data));
            dispatch(onClickUpdatePage({ page: 1 }));
            break;
          case 'mainType':
            data = {
              filterMainType: e.target.value,
            };
            dispatch(onClickUpdateFilterMainType(data));
            dispatch(onClickUpdatePage({ page: 1 }));
            break;
          case 'secondType':
            data = {
              filterSecondType: e.target.value,
            };
            dispatch(onClickUpdateFilterSecondType(data));
            dispatch(onClickUpdatePage({ page: 1 }));
            break;
          default:
            data = {
              filterCountry: e.target.value,
            };
            dispatch(onClickUpdateFilterCountry(data));
            dispatch(onClickUpdatePage({ page: 1 }));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (props.setGlobalValue) {
      navigate(
        `/${currentLanguage}/marketing/offers?` +
          `&filterCountry=${filterCountry}&filterMainType=${filterMainType}&filterSecondType=${filterSecondType}&page=${page}` +
          `&refId=${refId}&providerId=${providerId}&offerId=${offerId}`
      );
    }
  }, [
    props.setGlobalValue,
    currentLanguage,
    filterCountry,
    filterMainType,
    filterSecondType,
    refId,
    providerId,
    offerId,
    page,
    navigate,
  ]);

  return (
    <div className='form-wrapper' style={{ marginTop: '5px' }}>
      <label
        style={{
          color: props.titleColor || '',
          fontSize: props.titleSize || '',
          marginLeft: props.titleMarginLeft || '',
        }}
      >
        {props.title}
      </label>
      {props.details && (
        <p style={{ fontSize: '9px', marginBottom: '10px' }}>{props.details}</p>
      )}

      <select
        ref={props.selectRef}
        onChange={handleSelect}
        value={props.selected}
        className='form-control'
        style={{ cursor: 'pointer' }}
      >
        {!props.isTime &&
          props.options &&
          props.options.map((option) => (
            <option value={option.value} key={option.value}>
              {t(`${option.label}`)}
            </option>
          ))}
        {props.isTime &&
          props.options &&
          props.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default DropDown;
