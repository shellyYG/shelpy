import Wrapper from '../components/Wrapper';
import HomeCard from '../components/HomeCard';
import Dropdown from '../components/Dropdown';
import '../App.css';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
      }}
    >
      <div className="wrapper">
        <div className="image-row">
          <HomeCard
            position={'left'}
            text={'Find Help'}
            imageSrc={'/offer_help.jpeg'}
          />
          <HomeCard
            position={'right'}
            text={'Offer Help'}
            imageSrc={'/offer_help.jpeg'}
          />
        </div>

        <Dropdown />
      </div>
    </div>
  );
};

export default Home;
