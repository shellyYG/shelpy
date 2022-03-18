function CheckBox(props) {
  const handleCheck = () => {
    props.handleCheck(!props.checked);
  };
  const fontSize = props.fontSize || '12px';
  return (
    <div
      className='form-row'
      style={{
        paddingRight: props.paddingRight,
        marginBottom: props.marginBottom,
      }}
    >
      <div>
        <input
          type='checkbox'
          checked={props.checked}
          onChange={handleCheck}
          ref={props.checkRef}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <p
            style={{
              fontSize,
              fontWeight: 'normal',
              paddingLeft: '10px',
              marginBottom: '5px'
            }}
          >
            {props.title}
          </p>
        </div>

        {props.details && (
          <div>
            <p
              style={{
                fontSize: '9px',
                paddingLeft: '9px',
                
              }}
            >
              {props.details}
            </p>
          </div>
        )}
      </div>

      <br />
    </div>
  );
}

export default CheckBox;
