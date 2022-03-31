import FilledStarIcon from './Icons/FilledStarIcon';
import FilledHalfStarIcon from './Icons/FilledHalfStarIcon';
import NoFilledStarIcon from './Icons/NoFilledStarIcon';
const ScoreStars = (props) => {
  const averageScore = props.averageScore;
  return (
    <>
      {(averageScore === 0 || isNaN(averageScore)) && (
        <>
          <NoFilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore === 1 && (
        <>
          <FilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore > 1 && averageScore < 2 && (
        <>
          <FilledStarIcon />
          <FilledHalfStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore === 2 && (
        <>
          <FilledStarIcon />
          <FilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore > 2 && averageScore < 3 && (
        <>
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledHalfStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore === 3 && (
        <>
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <NoFilledStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore > 3 && averageScore < 4 && (
        <>
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledHalfStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore === 4 && (
        <>
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <NoFilledStarIcon />
        </>
      )}
      {averageScore > 4 && averageScore < 5 && (
        <>
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledHalfStarIcon />
        </>
      )}
      {averageScore === 5 && (
        <>
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
          <FilledStarIcon />
        </>
      )}
    </>
  );
};

export default ScoreStars;
