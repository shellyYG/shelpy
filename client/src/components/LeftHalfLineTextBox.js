function LeftHalfLineTextBox(props) {
  return (
      <div className='form-wrapper'>
        <label>{props.title}</label>
        <input
          type='text'
          className='form-control'
          style={{ fontSize: '12px' }}
          placeholder={props.placeholder}
          ref={props.inputRef}
        />
      </div>
  );
}

export default LeftHalfLineTextBox;
