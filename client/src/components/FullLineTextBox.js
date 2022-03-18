function FullLineTextBox(props) {
    return (
      <div className='form-row' style={{ marginTop: props.marginTop, marginBottom: props.marginBottom }}>
        <div className='form-wrapper-full'>
          <label style={{ color: props.labelColor || ''}}>{props.title}</label>
          {props.details && <p style={{ fontSize: '9px', marginBottom: '10px' }}>{props.details}</p>}
          <input
            type='text'
            className='form-control'
            style={{ fontSize: '12px' }}
            placeholder={props.placeholder}
            ref={props.inputRef}
            maxLength={props.maxLength || '100'}
            onChange={props.onChange}
          />
        </div>
      </div>
    );
}

export default FullLineTextBox;