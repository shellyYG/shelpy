function GuidanceCard(props) {
  return (
    <>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {props.title}
      </p>
      <br />
      {props.details}
      <br />
      <div className='guidanceImgContainer'>
        <img src={props.imgPath} alt={props.imgAlt}></img>
      </div>
    </>
  );
}

export default GuidanceCard;
