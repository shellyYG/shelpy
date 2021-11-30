function CheckBox(props) {
  const handleCheck = () => {
    props.handleCheck(!props.checked);
  };
  return (
    <div className='form-row'>
        <input
          type="checkbox"
          checked={props.checked}
          onChange={handleCheck}
          ref={props.checkRef}
        />
      <th style={{fontSize: '12px', fontWeight: 'normal', paddingLeft:'10px', verticalAlign: 'middle'}}>{props.details}</th>
    </div>
  );
}

export default CheckBox;
