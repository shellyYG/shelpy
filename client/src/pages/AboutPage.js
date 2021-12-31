import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate = useNavigate();
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/home", { replace: true });
  };
  window.addEventListener("popstate", onBackButtonEvent, { once: true });
  return (
    <div className="main-content-wrapper">
      <div className="section-center-align">
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>SHELPY</h1>
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          is a German-based company.
        </h2>
        <h2
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          We aim at integrating foreigners to local society globally.
        </h2>
      </div>
    </div>
  );
};

export default AboutPage;
