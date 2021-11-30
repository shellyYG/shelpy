function FullLineTextBox(props) {
    return (
      <div className="form-row last">
        <div className="form-wrapper-full">
          <label for="">{props.title}</label>
          <input
            type="text"
            className="form-control"
            style={{ fontSize: '12px' }}
            placeholder={props.placeholder}
          />
        </div>
      </div>
    );
}

export default FullLineTextBox;