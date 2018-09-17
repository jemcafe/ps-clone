import React from 'react';
import PropTypes from 'prop-types';

function ColorPair (props) {
  const { 
    color: c,
    selectColor
   } = props;

  // styles
  const style = {
    frgd: c.selected === 'frgd' ? { borderColor: '#d3d3d3' } : null,
    bkgd: c.selected === 'bkgd' ? { borderColor: '#d3d3d3' } : null,
  }

  return (
    <div className="color-pair">
      <div className="color-block-wrapper">
        <div className="color-block" 
          style={style.bkgd} 
          onClick={() => selectColor('bkgd')}>
          <div><div style={{ background: c.bkgd.hex }}></div></div>
        </div>
      </div>
      <div className="color-block-wrapper">
        <div className="color-block" 
          style={style.frgd} 
          onClick={() => selectColor('frgd')}>
          <div><div style={{ background: c.frgd.hex }}></div></div>
        </div>
      </div>
    </div>
  );
}

ColorPair.propTypes = {
  color: PropTypes.object.isRequired,
  selectColor: PropTypes.func.isRequired
}

export default ColorPair;