function Dropdown(props) {
  const handleSelect = (e) => {
    props.handleSelect(e.target.value);
  };
  return (
    <tr>
      <label>
        <th className="dropdownTitle">{props.title}</th>
        <th>
          <select ref={props.selectRef} onChange={handleSelect}>
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
