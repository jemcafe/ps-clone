import React from 'react';
import PropTypes from 'prop-types';
import paintBucket from '../../../assets/images/cursor-paintBucket.svg';

function PaintBucket (props) {
  const { mouse, zIndex } = props;

  const size = 24;
  const pos = { x: mouse.x - 1, y: mouse.y - 1 };

  // styles
  const style = {
    paintBucket: {
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      height: size,
      zIndex: zIndex
    }
  }

  return <img id="cursor-paintBucket" style={ style.paintBucket } src={ paintBucket } alt="Paint bucket"/>;
}

PaintBucket.propTypes = {
  mouse: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export default PaintBucket;