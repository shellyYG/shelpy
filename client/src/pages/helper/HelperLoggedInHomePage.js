import { useNavigate } from 'react-router-dom';
import '../../App.css';
import MktRow from '../../components/MktRow';

const HelperLoggedInHomePage = () => {
  const navigate = useNavigate();
  function handleCreateOfferClick(e) {
    e.preventDefault();
    navigate('/helper/service-types', { replace: true });
  }
  
  return (
    <div className='main-content-wrapper-no-height'>
      <div className='home-page-container'>
        <div className='centerWrapperWithBackgroundHelper'>
          <div className='coverLeft'>
            <div>
              <h1 style={{ textAlign: 'center', color: 'white' }}>
                Help people while earning money!
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
                Become a helper <br />
                and make extra revenue stream!
              </h2>
            </div>
          </div>
          <div className='coverButtonWrapper'>
            <div style={{ margin: 'auto' }}>
              <button class='btn-next' onClick={handleCreateOfferClick}>
                {' '}
                CREATE OFFER NOW
              </button>
            </div>
          </div>
        </div>
        <div className='centerWrapperMkt'>
          <div className='mktWrapper'>
            <MktRow
              title='HELP people'
              details1='Were you once hesitating?'
              details2='Help people who are now standing on the crossroad and wonders.'
              imagePath='/crossroad.jpeg'
              lastChild={false}
            />
            <MktRow
              title='GENERATE extra revenue'
              details1='Thinking about having a side business?'
              details2='Join us and create extra safenet to reach your financial freedom.'
              imagePath='/sidebusiness.jpeg'
              lastChild={false}
            />
            <MktRow
              title='FREE marketing listing'
              details1='Are you already a career/study counselor?'
              details2='Get extra exposure with us and meet your potential customers.'
              imagePath='/counselor.jpeg'
              lastChild={true}
            />
            <MktRow
              title='CONTROL your own privacy'
              details1='Want to share some private but important insights?'
              details2='You decide if you want to stay anonymously and how much you want to share.'
              imagePath='/oneToOne.jpeg'
              lastChild={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperLoggedInHomePage;
