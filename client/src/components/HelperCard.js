import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHelpeeData } from "../store/helpee/helpee-actions";
import { helpeeActions } from "../store/helpee/helpee-slice";

function HelperCard(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  return (
    <div className={active ? "history-card-active" : "history-card"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "1%",
        }}
      >
        <div className="helper-ImgBx">
          <img src={"/visa.jpeg"} alt={"visa"}></img>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="content">
          <div className="contentBx">
            <h3 style={{ fonrWeight: "bold", fontSize: "24px" }}>Shelly</h3>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="content">
          <div className="contentBx">
            <h3 style={{ fonrWeight: "bold", fontSize: "20px" }}>***** (16)</h3>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="content">
          <div className="contentBx">
            <p style={{ fontSize: "20px" }}>Hired xxx times</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "5%",
          marginLeft: "auto",
        }}
      >
        <div className="content">
          <div className="contentBx">
            <p
              style={{
                marginBottom: "12px",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              €100.70 / Hour
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "5%",
        }}
      >
        <div className="content">
          <div className="contentBx">
            <button className="btn-next" style={{ fontSize: '22px', height: 'auto', fontWeight: 'bold'}}>Contact Her</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HelperCard;
