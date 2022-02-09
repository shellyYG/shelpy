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
      <input
        type='checkbox'
        checked={props.checked}
        onChange={handleCheck}
        ref={props.checkRef}
        style={{ cursor: 'pointer' }}
      />
      <p
        style={{
          fontSize,
          fontWeight: 'normal',
          paddingLeft: '10px',
          verticalAlign: 'middle',
        }}
      >
        {props.details}
      </p>
    </div>
  );
}

export default CheckBox;
