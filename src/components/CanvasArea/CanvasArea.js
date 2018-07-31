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
      project,
      canvasIsBigger,
      updateMousePosition,
      detectCanvasArea
    } = this.props;

    const style = {
      canvasArea: !canvasIsBigger ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      } : null
    }

    return (
      <div ref="canvasArea" id="canvas-area" 
        style={style.canvasArea}
        onMouseMove={(e) => updateMousePosition(e)}
        onMouseOver={() => detectCanvasArea(true)}
        onMouseLeave={() => detectCanvasArea(false)}>

        { project.layers.length > 0 && 
          <Canvas {...this.props} /> }
      </div>
    );
  }
}

CanvasArea.propTypes = {
  project: PropTypes.object.isRequired,
  updateDimensions: PropTypes.func.isRequired,
  updateMousePosition: PropTypes.func.isRequired,
  canvasIsBigger: PropTypes.bool,
  detectCanvasArea: PropTypes.func.isRequired
};

export default CanvasArea;