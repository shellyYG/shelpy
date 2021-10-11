function Dropdown(props) {
  const handleSelect = (e) => {
    props.handleSelect(e.target.value);
  };
  return (
    <tr className="dropdown-wrapper">
      <label>
        
        <th>
          <select
            ref={props.selectRef}
            onChange={handleSelect}
            className="dropdown-body"
          >
            <option> Frankfurt </option>
            <option> Berlin </option>
            <option> Münich </option>
          </select>
        </th>
      </label>
    </tr>
  );
}

export default Dropdown;
