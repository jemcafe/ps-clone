import React from 'react';
import PropTypes from 'prop-types';
import cursor from '../../../assets/images/cursor-pen.svg';

function Pen (props) {
  const { mouse, zIndex } = props;

  const size = 24;
  const pos = { x: mouse.x, y: mouse.y };

  // styles
  const style = {
    pen: {
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      width: size,
      zIndex: zIndex
    }
  }

  return (
    <img id="cursor-pen" style={ style.pen } src={ cursor } alt="pen"/>
  );
}

Pen.propTypes = {
  mouse: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export default Pen;