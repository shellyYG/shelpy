import { useTranslation } from "react-i18next";

function HalfLineTextBox(props) {
    const { t } = useTranslation();
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value && // can not use ===
        !isNaN(parseInt(value, 10))
      );
    }
  return (
    <div className='form-wrapper-half'>
      <label>{props.title}</label>
      <input
        defaultValue={props.defaultValue}
        type='text'
        className='form-control'
        style={{ fontSize: '12px' }}
        placeholder={props.placeholder}
        ref={props.inputRef}
        maxLength={props.maxLength || '100'}
        onChange={props.onChange}
      />
      {!isInt(props.typingPrice) && (
        <p style={{ color: 'red' }}>{t('form_price_warning')}</p>
      )}
    </div>
  );
}

export default HalfLineTextBox;
