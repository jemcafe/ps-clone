import React from 'react';
import PropTypes from 'prop-types';

function Swatches (props) {
  const { 
    recentColors,
    colors,
    selectColor
  } = props;

  return (
    <div id="swatches">
      <div className="recent-swatches-wrapper">
        <ul className="recent-swatches">
          { recentColors.map((color, i) => (
            <div
            key={i}
            className="swatch"
            style={{ backgroundColor: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})` }}
            onClick={() => selectColor(i, color)}>
            </div>
          )) }
        </ul>
      </div>
      <ul className="swatch-list">
        { colors.map((color, i) => (
          <div 
            key={i} 
            className="swatch" 
            style={{ backgroundColor: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})` }}
            onClick={() => selectColor(i, color)}>
          </div>
        )) }
      </ul>
    </div>
  );
}

Swatches.propTypes = {
  recentColors: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  selectColor: PropTypes.func.isRequired,
}

export default Swatches;