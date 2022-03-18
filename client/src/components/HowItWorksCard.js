function HowItWorksCard(props) {
  return (
    <>
      <div className='howItWorksImgContainer'>
        <img src={props.imgPath} alt={props.imgAlt}></img>
      </div>
    </>
  );
}

export default HowItWorksCard;
