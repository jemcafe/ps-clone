import React from 'react';
import PropTypes from 'prop-types';
import zoomIn from '../../../assets/images/cursor-zoomIn.svg';
import zoomOut from '../../../assets/images/cursor-zoomOut.svg';

function Magnify (props) {
  const { mouse, zIndex, magnify } = props;

  const size = 18;
  const pos = { x: mouse.x - size/3, y: mouse.y - size/3 };

  // styles
  const style = {
    magnify: {
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      width: size,
      zIndex: zIndex
    }
  }

  if ( magnify.in ) return <img id="cursor-zoom-in" style={ style.magnify } src={ zoomIn } alt="zoom in"/>;
  if ( magnify.out ) return <img id="cursor-zoom-out" style={ style.magnify } src={ zoomOut } alt="zoom out"/>;
}

Magnify.propTypes = {
  mouse: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export default Magnify;