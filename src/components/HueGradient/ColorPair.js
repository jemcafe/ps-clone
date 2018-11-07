import React from 'react';
import PropTypes from 'prop-types';

function ColorPair (props) {
  const { 
    color,
    selectColor,
    setCanvas
   } = props;

  // styles
  const style = {
    frgd: color.selected === 'frgd' ? { borderColor: '#d3d3d3' } : null,
    bkgd: color.selected === 'bkgd' ? { borderColor: '#d3d3d3' } : null,
  }

  return (
    <div className="color-pair">
      <div className="color-block-wrapper">
        <div className="color-block" 
          style={style.bkgd} 
          onMouseDown={() => selectColor('bkgd')}
          onMouseUp={() => setCanvas()}
          onMouseLeave={() => setCanvas()}>
          <div>
            <div style={{ background: color.bkgd.hex }}></div>
          </div>
        </div>
      </div>
      <div className="color-block-wrapper">
        <div className="color-block" 
          style={style.frgd} 
          onMouseDown={() => selectColor('frgd')}
          onMouseUp={() => setCanvas()}
          onMouseLeave={() => setCanvas()}>
          <div>
            <div style={{ background: color.frgd.hex }}></div>
          </div>
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