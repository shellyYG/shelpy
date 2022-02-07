function FullLineTextBox(props) {
    return (
      <div className='form-row' style={{ marginTop: props.marginTop }}>
        <div className='form-wrapper-full'>
          <label>{props.title}</label>
          <input
            type='text'
            className='form-control'
            style={{ fontSize: '12px' }}
            placeholder={props.placeholder}
            ref={props.inputRef}
            maxlength='100'
          />
        </div>
      </div>
    );
}

export default FullLineTextBox;