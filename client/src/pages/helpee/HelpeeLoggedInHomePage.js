import { useNavigate } from 'react-router-dom';
import '../../App.css';
import MktRow from '../../components/MktRow';

const HelpeeLoggedInHomePage = () => {
  const navigate = useNavigate();
  function handleBookHelperClick(e) {
    e.preventDefault();
    navigate('/helpee/service-types');
  }
  return (
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div className='centerWrapperWithBackground'>
          <div className='coverLeft'>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                Thinking about your next step?
              </h1>
            </div>
            <div>
              <h2
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '30px',
                  color: 'white',
                }}
              >
                Talk to an insider <br />
                before you make your decision!
              </h2>
            </div>
          </div>
          <div className='coverButtonWrapper'>
            <div style={{ margin: 'auto' }}>
              <button class='btn-next' onClick={handleBookHelperClick}> BOOK HELPER NOW</button>
            </div>
          </div>
        </div>
        <div className='centerWrapperMkt'>
          <div className='mktWrapper'>
            <MktRow
              title='MINIMIZE your risk'
              details1='Afraid of taking that big leap?'
              details2='Invest only 30 min and on average 20 Euro before you make the final decision.'
              imagePath='/dinner.jpeg'
              lastChild={true}
            />
            <MktRow
              title='MEET role models'
              details1='Do not have the network?'
              details2='Come talk to people who have successfully gone through your dream path.'
              imagePath='/friends.jpeg'
              lastChild={false}
            />
            <MktRow
              title="GET answers that you can't find on GOOGLE"
              details1='Your questions are too personal or too specific?'
              details2='Ask insiders and get first-hand information.'
              imagePath='/oneToOne.jpeg'
              lastChild={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpeeLoggedInHomePage;
