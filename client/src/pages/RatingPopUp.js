import { useTranslation } from "react-i18next";
import ScoreStars from "../components/ScoreStars";
import SingleComment from "../components/SingleComment";

const RatingPopUp = (props) => {
    const { t } = useTranslation();
    return (
      <>
        <div className='popup'>
          <div className='pureFlexRow' style={{ flexWrap: 'wrap' }}>
            {' '}
            <div
              style={{ marginLeft: 'auto', cursor: 'pointer' }}
              onClick={props.onClick}
            >
              X
            </div>
          </div>
          <div className='popUpTopSticker'>
            <div style={{ alignSelf: 'center', marginLeft: '10px' }}>
              {' '}
              <p
                style={{
                  fontSize: '24px',
                  color: 'grey',
                  fontWeight: 'bold',
                }}
              >
                {!isNaN(props.averageScore) &&
                  Math.round(props.averageScore * 10) / 10}
                {isNaN(props.averageScore) && 0.0}
              </p>
            </div>
            <div className='starWrapper'>
              <div className='pureFlexRowMarginAuto'>
                <ScoreStars averageScore={props.averageScore} />
              </div>
            </div>
            <div style={{ alignSelf: 'center', marginLeft: '10px' }}>
              {' '}
              {props.ratingData.length}
              {t('comments_unit')}
              {t('comments')}
            </div>
          </div>
          <div
            className='pureFlexColumn'
            style={{
              overflowY: 'scroll',
              padding: '8px',
              overflowX: 'hidden',
            }}
          >
            {' '}
            {props.ratingData.map((r) => (
            <SingleComment
              writerName={r.writerUsername}
              score={r.score}
              comments={r.comments}
            />
            ))}
          </div>
        </div>
      </>
    );
};

export default RatingPopUp;