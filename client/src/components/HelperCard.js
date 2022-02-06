import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onClickUpdateActiveSelectedHelper } from '../store/helpee/helpee-actions';
import FilledStarIcon from './Icons/FilledStarIcon';
import FilledHalfStarIcon from './Icons/FilledHalfStarIcon';
import NoFilledStarIcon from './Icons/NoFilledStarIcon';

function HelperCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    // change global state for matching active service type for UI changes
    const data = {
      selectedHelper: props.value,
    };
    try {
      dispatch(onClickUpdateActiveSelectedHelper(data));
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }

  useEffect(() => {
    if (props.selectedHelper !== props.value) {
      setActive(false);
    }
  }, [props.selectedHelper, props.value]);

  return (
    <div className={active ? 'card-active' : 'card'} onClick={handleOnClick}>
      <div className='content'>
        <div className='imgBx'>
          <img src={props.imageSrc} alt={props.text}></img>
        </div>
        <div className='contentBx'>
          <div style={{ marginTop: '18px', display: 'flex' }}>
            <h3 style={{ margin: 'auto' }}>{props.username}</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <FilledStarIcon />
            <FilledStarIcon />
            <FilledStarIcon />
            <FilledHalfStarIcon />
            <NoFilledStarIcon />
            (16)
          </div>
          <div
            style={{
              marginTop: '6px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 style={{ margin: 'auto', fontSize: '12px' }}>
              From: {props.nationality}
            </h3>
            <h3 style={{ margin: 'auto', fontSize: '12px' }}>
              Native language: {props.nativeLanguage}
            </h3>
            {props.firstLanguage && (
              <h3 style={{ margin: 'auto', fontSize: '12px' }}>
                Also speaks: {props.firstLanguage}
              </h3>
            )}
            {props.firstLanguage && props.secondLanguage && (
              <h3 style={{ margin: 'auto', fontSize: '12px' }}>
                Also speaks: {props.firstLanguage}, {props.secondLanguage}
              </h3>
            )}
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
export default HelperCard;
