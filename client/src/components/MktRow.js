function MktRow(props) {

    return (
      <div className={props.lastChild ? 'lastSingleMkt' : 'singleMkt'}>
        <div className='mktTitleLeft'>
          <div className='mktTitle'>
            <h2>{props.title}</h2>
          </div>
          <div className='mktDetails'>
            <p>{props.details1}</p>
          </div>
          <div className='mktDetails'>
            <p>{props.details2}</p>
          </div>
        </div>
        <div className='mktPictureRight'>
          <div className='rectangleImageBxRight'>
            <img src={props.imagePath} alt={props.alt}></img>
          </div>
        </div>
      </div>
    );

}

export default MktRow;