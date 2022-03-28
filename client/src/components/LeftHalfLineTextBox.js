function LeftHalfLineTextBox(props) {
  return (
    <div className='form-wrapper' style={{ marginBottom: props.marginBottom }}>
      <label>{props.title}</label>
      {props.details && (
        <p style={{ fontSize: '9px', marginBottom: '10px' }}>{props.details}</p>
      )}
      <input
        defaultValue={props.defaultValue}
        type='text'
        className='form-control'
        style={{ fontSize: '12px' }}
        placeholder={props.placeholder}
        ref={props.inputRef}
        onChange={props.onChange}
      />
    </div>
  );
}

export default LeftHalfLineTextBox;
