import ScoreStars from "./ScoreStars";

const SingleComment = (props) => {
  
  return (
    <div className='pureFlexColumn' style={{ margin: '10px' }}>
      <div className='pureFlexRow'>
        <div>
          <p>{props.writerName}</p>
        </div>
        <div className='pureFlexRowMarginAuto' style={{ marginLeft: '10px'}}>
          <ScoreStars averageScore={props.score} />
        </div>
      </div>
      <div className='pureFlexRow' style={{ marginTop: '5px'}}>
        <p>{props.comments}</p>
      </div>
    </div>
  );
};

export default SingleComment;
