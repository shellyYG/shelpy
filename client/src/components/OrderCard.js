import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchHelpeeData } from "../store/helpee/helpee-actions";
import { helpeeActions } from "../store/helpee/helpee-slice";

function OrderCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  function handleOnClick(e) {
    e.preventDefault();
    navigate("/helper-lists", { replace: true });
  }
  

  return (
    <div className={active ? "history-card-active" : "history-card"} onClick={handleOnClick}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="content">
          <div className="contentBx">
            <h3 style={{ fonrWeight: 'bold', fontSize: '24px'}} >Visum</h3>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "5%",
        }}
      >
        <div className="helper-ImgBx">
          <img src={"/visa.jpeg"} alt={"visa"}></img>
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
            <p style={{ marginBottom: "12px", fontWeight: 'bold' }}> Helper: Shelly ***** </p>
            <a> Write Review </a>
            <a> Chat History </a>
            <span>{props.valueProps2}</span>
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
            <p style={{ marginBottom: "12px", fontWeight: 'bold' }}> €100.70 </p>
            <a> View Receipt </a>
            <span>{props.valueProps2}</span>
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
            <p style={{ marginBottom: "12px", fontWeight: 'bold' }}>
              iconPlaceholder Friday - August 13, 2021{" "}
            </p>
            <p>13:00 </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderCard;
