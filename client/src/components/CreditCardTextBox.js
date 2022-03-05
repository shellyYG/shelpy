function CreditCardTextBox(props) {
  return (
    <div
      className='form-row'
      style={{ marginTop: props.marginTop, marginBottom: props.marginBottom }}
    >
      <label style={{ color: props.labelColor || '' }}>{props.title}</label>
      <div className='tpfield' id={props.id}></div>
    </div>
  );
}

export default CreditCardTextBox;
