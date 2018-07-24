import React from 'react';

function Select () {
  return (
    <li className="select">
      Select:&nbsp;&nbsp;
      <select defaultValue="Layer">
        <option>Group</option>
        <option>Layer</option>
      </select>
    </li>
  );
}

export default Select;