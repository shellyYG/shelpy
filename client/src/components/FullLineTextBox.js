function FullLineTextBox(props) {
    return (
      <div className='form-row' style={{ marginTop: props.marginTop, marginBottom: props.marginBottom }}>
        <div className='form-wrapper-full'>
          <label>{props.title}</label>
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