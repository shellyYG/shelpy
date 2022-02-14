import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };
  window.addEventListener("popstate", onBackButtonEvent, { once: true });
  return (
    <div className='main-content-wrapper-homepage'>
      <div className='section-center-align-landing'>
        <div
          className='centerWrapper'
          style={{ textAlign: 'center', paddingTop: '28px' }}
        >
          <h2>Mission Statement</h2>
          <br />
          <h3>
            By connecting professions and students, <br />
            <br />
            Shelpy aims at helping people to change their lives.
          </h3>
          <br />
          <h2>Impressum</h2>
          <br />
          <h3>
            Angaben gemäß § 5 TMG Obertshausen, Germany
            <br />
            <br />
            E-Mail: team@shelpy.de
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
