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
        <div className='centerWrapper' style={{ textAlign: 'center', paddingTop: '28px' }}>
          <h2>Mission Statement</h2>
          <br />
          <h3>
            By matching foreigners to a local buddy to accompany them to the
            local meetings, <br />
            <br />
            Shelpy aims at integrating foreigners to local society globally.
          </h3>
          <br />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
