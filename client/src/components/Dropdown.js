function DropDown(props) {
  const handleSelect = (e) => {
    props.handleSelect(e.target.value);
  };
  return (
    <div className='form-wrapper'>
      <label style={{ color: props.titleColor || '', fontSize: props.titleSize || '' }}>{props.title}</label>
      <select
        ref={props.selectRef}
        onChange={handleSelect}
        value={props.selected}
        className='form-control'
        style={{ cursor: 'pointer' }}
      >
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
