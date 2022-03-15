function GuidanceCard(props) {
  return (
    <>
      <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '30px auto 10px' }}>
        {props.title}
      </p>
      <ul style={{ marginBottom: '10px' }}>
        {props.list1 && <li style={{ marginLeft: '1em' }}>{props.list1}</li>}
        {props.list2 && <li style={{ marginLeft: '1em' }}>{props.list2}</li>}
        {props.list3 && <li style={{ marginLeft: '1em' }}>{props.list3}</li>}
        {props.list4 && <li style={{ marginLeft: '1em' }}>{props.list4}</li>}
        {props.list5 && <li style={{ marginLeft: '1em' }}>{props.list5}</li>}
        {props.list6 && <li style={{ marginLeft: '1em' }}>{props.list6}</li>}
        {props.list7 && <li style={{ marginLeft: '1em' }}>{props.list7}</li>}
        {props.list8 && <li style={{ marginLeft: '1em' }}>{props.list8}</li>}
      </ul>
      <div className='guidanceImgContainer'>
        <img src={props.imgPath} alt={props.imgAlt}></img>
      </div>
    </>
  );
}

export default GuidanceCard;
