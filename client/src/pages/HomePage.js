import { useHistory } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import '../App.css';

const HomePage = () => {
  const history = useHistory();
  function handleNext(e) {
    e.preventDefault();
    let path = 'get-help-form';
    history.push(path);
  }
  return (
    <div className="main-content-wrapper">
      <div className="section-left-align">
        <div>
          {/* <button className="btn-back" onClick={handleNext}>
            ❮ Back
          </button> */}
        </div>
      </div>
      <div className="section-center-align">
        <div className="container">
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Rathaus"
            valueProps1="Townhall"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Ausländerbehörde"
            valueProps1="Foreigner Office"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Others"
            valueProps1="Others"
            valueProps2=""
          />
        </div>
      </div>
      <div className="section-right-align">
        <button className="btn-next" onClick={handleNext}>
          Next ❯
        </button>
      </div>
    </div>
  );
};

export default HomePage;
