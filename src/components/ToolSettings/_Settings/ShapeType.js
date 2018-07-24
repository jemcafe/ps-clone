import React from 'react';

function ShapeType () {
  return (
    <li className="shape-type">
      Type:&nbsp;&nbsp;
      <select defaultValue="Path">
        <option>Shape</option>
        <option>Path</option>
        <option>Pixels</option>
      </select>
    </li>
  );
}

export default ShapeType;