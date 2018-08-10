import React from 'react';
import PropTypes from 'prop-types';
import pen from '../../../assets/images/cursor-pen.svg';

function Pen (props) {
  const { mouse, zIndex } = props;

  const size = 24;
  const pos = { x: mouse.x, y: mouse.y };

  const style = {
    position: 'fixed',
    top: pos.y,
    left: pos.x,
    width: size,
    zIndex: zIndex
  }

  return <img id="cursor-pen" style={ style } src={ pen } alt="pen"/>;
}

Pen.propTypes = {
  mouse: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export default Pen;