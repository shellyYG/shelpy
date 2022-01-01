import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onClickUpdateActiveRequest,
  onClickUpdateActiveHelperLists,
} from "../store/helpee/helpee-actions";
function RequestList(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  function handleOnClick(e) {
    e.preventDefault();
    const data = {
      globalActiveRequest: props.service,
    };
    try {
      dispatch(onClickUpdateActiveRequest(data));
      // update active helper lists
      dispatch(onClickUpdateActiveHelperLists(data))
    } catch (err) {
      console.error(err);
    }
    setActive(!active);
  }
  useEffect(() => {
    if (props.globalActiveRequest !== props.service) {
      setActive(false);
    }
  }, [props.globalActiveRequest, props.service]);

  return (
    <div
      onClick={handleOnClick}
      className={active ? "request-active" : "request"}
    >
      <div style={{ fontSize: "22px" }}>{props.service}</div>
    </div>
  );
}
export default RequestList;
