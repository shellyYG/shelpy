function DropDown(props) {
  const handleSelect = (e) => {
    props.handleSelect(e.target.value);
  };
  return (
    <div className="form-wrapper">
      <label>{props.title}</label>
      <select
        ref={props.ref}
        onChange={handleSelect}
        value={props.selected}
        className="form-control"
      >
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {' '}
            {option.label}{' '}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
