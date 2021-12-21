function DateForm(props) {
    return (
      <div className="form-wrapper">
        <label for="">{props.title}</label>
        <span className="">
          <input
            type="date"
            className="form-control"
            value={props.value}
            onChange={props.handleInput}
            ref={props.dateFormRef}
          ></input>
        </span>
      </div>
    );
}

export default DateForm;