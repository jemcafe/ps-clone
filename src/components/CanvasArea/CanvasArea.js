import React from 'react';
import PropTypes from 'prop-types';

import Canvas from '../../containers/CanvasCntr';

function CanvasArea (props) {
  const { 
    project: p
  } = props;

  return (
    <div id="canvas-area">
      { p.layers.length > 0 && <Canvas project={p} /> }
    </div>
  );
}

CanvasArea.propTypes = {
  project: PropTypes.object.isRequired
};

export default CanvasArea;