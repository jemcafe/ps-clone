import React from 'react';
import PropTypes from 'prop-types';

function Brush (props) {
  const { mouse, radius, zIndex } = props;

  const stroke = '#000000';
  const strokeWidth = 1;
  const fill = 'transparent';
  const r = radius;
  const width = (r * 2) + (strokeWidth * 2);
  const height = (r * 2) + (strokeWidth * 2);
  const cx = r + strokeWidth;
  const cy = r + strokeWidth;
  const pos = { x: -r + mouse.x - 1, y: -r + mouse.y - 1 };

  // styles
  const styles = {
    brush: {
      position: 'fixed',
      top: pos.y,
      left: pos.x,
      zIndex: zIndex
    }
  }

  return (
    <svg id="brush" width={ width } height={ height } style={ styles.brush }>
      <circle cx={ cx } cy={ cy } r={ r } stroke={ stroke } strokeWidth={ strokeWidth } fill={ fill } />
    </svg>
  );
}

Brush.propTypes = {
  mouse: PropTypes.object.isRequired,
  radius: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
}

export default Brush;