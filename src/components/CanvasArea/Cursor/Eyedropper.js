import React from 'react';
import PropTypes from 'prop-types';

function Eyedropper (props) {
  const { mouse, size, zIndex } = props;

  const pos = { x: mouse.x, y: mouse.y - size - 4 };

  // styles
  const style = {
    eyedropper: {
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      fontSize: size,
      zIndex: zIndex,
      color: '#000000',
      background: 'gray'
    }
  }

  return (
    <span id="cursor-eyedropper" style={style.eyedropper}>
      <i className="icon-eyedropper"></i>
    </span>
  );
}

Eyedropper.propTypes = {
  mouse: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
}

export default Eyedropper;