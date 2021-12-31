import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.removeEventListener("popstate", onBackButtonEvent);
    navigate(-1);
  };
  useEffect(() => {
    console.log("window.location.pathname: ", window.location.pathname);
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent, { once: true });
  }, []);
  return (
    <div className="main-content-wrapper">
      <section>
        <div>
          <h1>About</h1>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
