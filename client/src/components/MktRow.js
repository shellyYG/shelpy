function MktRow(props) {

    return (
      <div className={props.lastChild ? 'lastSingleMkt' : 'singleMkt'}>
        <div className='mktTitleLeft'>
          <div className='mktTitle'>
            <h3>{props.title}</h3>
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
            <img src={props.imagePath} alt='connection'></img>
          </div>
        </div>
      </div>
    );

}

export default MktRow;