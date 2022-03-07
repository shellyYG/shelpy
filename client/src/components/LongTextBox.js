function LongTextBox(props) {
  return (
    <div
      className='form-row'
      style={{ marginTop: props.marginTop, marginBottom: props.marginBottom }}
    >
      <div className='form-wrapper-full'>
        <label style={{ color: props.labelColor || '' }}>{props.title}</label>
        <textarea
          type='text'
          className='form-control'
          style={{ fontSize: '12px', height: '100px', flexWrap: 'wrap', paddingTop: '10px' }}
          placeholder={props.placeholder}
          ref={props.inputRef}
          maxLength={props.maxLength || '600'}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default LongTextBox;
