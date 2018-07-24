import React, { Component } from 'react';

class Mode extends Component {
  render () {
    return (
      <li className="mode">
        Mode:&nbsp;&nbsp;
        <select>
          <option>Normal</option>
        </select>
      </li>
    );
  }
}

export default Mode;