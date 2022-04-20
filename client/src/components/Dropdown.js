import { useTranslation } from 'react-i18next';

function DropDown(props) {
  const { t } = useTranslation();
  const handleSelect = (e) => {
    props.handleSelect(e.target.value);
  };
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
