function DropDown(props) {
  const handleSelect = (e) => {
    props.handleSelect(e.target.value);
  };
  return (
    <div className='form-wrapper'>
      <label>{props.title}</label>
      <select
        ref={props.selectRef}
        onChange={handleSelect}
        value={props.selected}
        className='form-control'
      >
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label === 'Others' ? 'Others (Please specify in the Notes below)' : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
