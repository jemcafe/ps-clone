import React from 'react';

function Zoom (props) {
  const { tool, zoom } = props;

  const classNames = {
    in: tool.in ? 'selected' : null,
    out: tool.out ? 'selected' : null,
  }

  return (
    <li className="zoom">
      <div className={classNames.in} onClick={() => zoom('in')}>
        <i className="icon-magnify-plus"></i>
      </div>
      <div className={classNames.out} onClick={() => zoom('out')}>
        <i className="icon-magnify-minus"></i>
      </div>
    </li>
  );
}

export default Zoom;