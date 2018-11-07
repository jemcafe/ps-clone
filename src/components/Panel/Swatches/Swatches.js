import React from 'react';
import PropTypes from 'prop-types';

function Swatches (props) {
  // const swatches = (num) => {
  //   let swatches = [];
  //   for (let i = 0; i < num; i++) 
  //     swatches.push(<canvas key={i} className="swatch"/>);
  //   return swatches;
  // }

  const { 
    recentColors,
    colors,
    addRecentColor
  } = props;

  return (
    <div id="swatches">
      <div className="recent-swatches-wrapper">
        <ul className="recent-swatches">
          {/* { swatches(12) } */}
        </ul>
      </div>
      <ul className="swatch-list">
        {/* { swatches(100) } */}
        { colors.map((color, i) => (
          <div 
            key={i} 
            className="swatch" 
            style={{ backgroundColor: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})` }}>
          </div>
        )) }
      </ul>
    </div>
  );
}

Swatches.propTypes = {
  recentColors: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  addRecentColor: PropTypes.func.isRequired,
}

export default Swatches;