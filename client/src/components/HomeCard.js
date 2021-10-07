function HomeCard(props) {
  return (
    <div className="single-image">
      <img src={props.imageSrc} alt={props.text}></img>
    </div>
  );
}

export default HomeCard;
