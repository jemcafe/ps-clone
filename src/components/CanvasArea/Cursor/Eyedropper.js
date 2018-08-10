import React from 'react';
import PropTypes from 'prop-types';
import cursor from '../../../assets/images/cursor-eyedropper.svg';

function Eyedropper (props) {
  const { mouse, zIndex } = props;

  const size = 24;
  const pos = { x: mouse.x - 1, y: mouse.y - size - 1 };

  // styles
  const style = {
    eyedropper: {
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      width: size,
      zIndex: zIndex
    }
  }

  return (
    <img id="cursor-eyedropper" style={ style.eyedropper } src={ cursor }alt="eyedropper"/>
  );
}

Eyedropper.propTypes = {
  mouse: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export default Eyedropper;