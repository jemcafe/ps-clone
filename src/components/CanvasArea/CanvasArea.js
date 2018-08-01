import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Canvas from '../../containers/CanvasCntr';

class CanvasArea extends Component {
  componentDidMount () {
    const { updateDimensions } = this.props;
    window.addEventListener("resize", () => updateDimensions(this.refs));
    updateDimensions(this.refs);
  }

  componentWillUnmount () {
    const { updateDimensions } = this.props;
    window.addEventListener("resize", () => updateDimensions(this.refs));
  }

  render () {
    const {
      hasLayers,
      focus,
      mouse,
      inCanvasArea,
      canvasIsBigger,
      updateMousePosition
    } = this.props;

    const style = {
      canvasArea: !canvasIsBigger ? {
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
      } : null
    }

    return (
      <div ref="canvasArea" id="canvas-area" 
        style={style.canvasArea}
        onMouseMove={(e) => updateMousePosition(e)}>

        { hasLayers && 
          <Canvas 
            focus={ focus }
            mouse={ mouse }
            inCanvasArea={ inCanvasArea }
            canvasIsBigger={ canvasIsBigger }
            updateMousePosition={ updateMousePosition } /> }
      </div>
    );
  }
}

CanvasArea.propTypes = {
  mouse: PropTypes.object.isRequired,
  inCanvasArea: PropTypes.bool.isRequired,
  canvasIsBigger: PropTypes.bool,
  updateDimensions: PropTypes.func.isRequired,
  updateMousePosition: PropTypes.func.isRequired
};

export default CanvasArea;