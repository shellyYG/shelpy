import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomeCard from '../components/HomeCard';
import '../App.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    DBHelpeeName,
    DBHelpeeLanguage,
    DBServiceType,
  } = useSelector((state) => state.helpee);
  console.log(
    `DBServiceType: ${DBServiceType} | DBHelpeeName: ${DBHelpeeName} | DBHelpeeLanguage: ${DBHelpeeLanguage}`
  );
  
  const history = useHistory();

  function handleNext(e) {
    e.preventDefault();
    let path = 'book-appointment-form';
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
            imageSrc={'/visa.jpeg'}
            title="Visum"
            valueProps1="Visa"
            valueProps2="Location: Ausländerbehörde"
            value="visa"
          />
          <HomeCard
            imageSrc={'/anmelden.jpeg'}
            title="Anmeldung"
            valueProps1="Residence Register"
            valueProps2="Location: Rathaus / Bürgeramt"
            value="anmelden"
          />
          <HomeCard
            imageSrc={'/arzt.jpeg'}
            title="Arzt Termin"
            valueProps1="Doctor's Appointment"
            valueProps2="Location: Praxis"
            value="arzt"
          />
          <HomeCard
            imageSrc={'/wohnung.jpeg'}
            title="Wohnung Besuche"
            valueProps1="Visit Apartment"
            valueProps2="Location: Wohnung"
            value="apartmentVisit"
          />
          <HomeCard
            imageSrc={'/phoneCall.jpeg'}
            title="Rufen auf Deutsch"
            valueProps1="Calling in German (book phone card, book electricity...etc)"
            valueProps2="Location: Online"
            value="calling"
          />
          <HomeCard
            imageSrc={'/offer_help.jpeg'}
            title="Sonstiges"
            valueProps1="Others"
            valueProps2="Location: Others"
            value="others"
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
