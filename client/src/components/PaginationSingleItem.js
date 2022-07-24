import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { onClickUpdatePage } from '../store/general/general-actions';

const PaginationSingleItem = (props) => {
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

  function handlePageClick(e) {
    e.preventDefault();
    try {
      dispatch(onClickUpdatePage({ page: props.number }));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {  
    navigate(
      `/${currentLanguage}/marketing/offers?` +
        `&filterCountry=${filterCountry}&filterMainType=${filterMainType}&filterSecondType=${filterSecondType}&page=${page}` +
        `&refId=${refId}&providerId=${providerId}&offerId=${offerId}`
    );
  }, [
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
    <li className='pageItem'>
      <div className={page === props.number ? 'activePageLink' : 'pageLink'} onClick={handlePageClick}>
        {props.number}
      </div>
    </li>
  );
};

export default PaginationSingleItem;
