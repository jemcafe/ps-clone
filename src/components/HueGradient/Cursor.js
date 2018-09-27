import React from 'react';
import PropTypes from 'prop-types';

function Cursor (props) {
  const { mouse, zIndex } = props;

  const strokeWidth = 3;
  const fill = 'transparent';
  const r = 8;
  const width = (r * 2) + (strokeWidth * 2);
  const height = (r * 2) + (strokeWidth * 2);
  const cx = r + 2;
  const cy = r + 2;
  const pos = { x: mouse.x - cx, y: mouse.y - cy };

  // styles
  const style = {
    brush: {
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      zIndex: zIndex ? zIndex : null
    }
  }

  return (
    <svg id="color-picker-cursor" style={style.brush} width={width} height={height}>
      <circle cx={cx} cy={cy} r={r} stroke={'#000000'} strokeWidth={strokeWidth} fill={fill}/>
      <circle cx={cx} cy={cy} r={r} stroke={'#ffffff'} strokeWidth={strokeWidth-2} fill={fill}/>
    </svg>
  );
}

Cursor.propTypes = {
  mouse: PropTypes.object.isRequired
}

export default Cursor;