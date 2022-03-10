function BulletPoint(props) {
  return (
    <li style={{ marginLeft: '1em' }}>
      <p>
        <strong>{props.title}</strong> 
        {' '}
        {props.details1}
        {props.details2 && <br />}
        {props.details2}
        {props.details3 && <br />}
        {props.details3}
      </p>
    </li>
  );
}

export default BulletPoint;
