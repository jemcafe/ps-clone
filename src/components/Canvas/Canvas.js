import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cursor from './Cursor/Cursor';

class Canvas extends Component {
  componentDidMount () {
    const { initCanvas, updateDimensions } = this.props;
    window.addEventListener("resize", () => updateDimensions(this.refs));
    initCanvas(this.refs);
  }

  componentWillUnmount() {
    const { updateDimensions } = this.props;
    window.removeEventListener("resize", () => updateDimensions(this.refs));
  }

  render () {
    const { 
      project: p,
      layers,
      tools,
      focus,
      mouse,
      inCanvasArea,
      canvasIsBigger,
      engage,
      updateMousePosition
    } = this.props;

    // styles
    const style = {
      wrapper: {
        width: `${p.width.size}px`,
        height: `${p.height.size}px`,
        margin: 'auto',
      },
      layer: (e) => ({
        visibility: e.visible ? 'visible' : 'hidden'
      })
    }

    return (
      <div ref="canvasWrapper" className="canvas-wrapper" style={style.wrapper}>

        { layers.map((e, i) => (
          <canvas key={e.id} 
            ref={`layer_${e.id}`} 
            className={`layer-${e.id}`}
            style={style.layer(e)}
            width={p.width.size} 
            height={p.height.size}/>
        )) }

        { (focus === 'canvas') && 
          <Cursor tools={tools} mouse={mouse} zIndex={1} /> }

        <canvas className="touch-overlay"
          ref="touch" 
          width={p.width.size} 
          height={p.height.size}
          onMouseDown={(e) => engage(this.refs[`layer_${p.canvasLayer}`], e)}
          onMouseMove={(e) => updateMousePosition(e, this.refs)}/>

      </div>
    );
  }
}

Canvas.propTypes = {
  project: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  tools: PropTypes.object.isRequired,
  mouse: PropTypes.object.isRequired,
  engage: PropTypes.func.isRequired,
  updateMousePosition: PropTypes.func.isRequired,
};

export default Canvas;