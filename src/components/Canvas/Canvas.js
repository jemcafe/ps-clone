import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cursor from './Cursor/Cursor';

class Canvas extends Component {
  componentDidMount () {
    // const { initCanvas } = this.props;
    // window.addEventListener("resize", () => initCanvas(this.refs));
    // initCanvas(this.refs);
    console.log(this.refs);
  }

  // componentWillUnmount() {
  //   const { initCanvas } = this.props;
  //   window.removeEventListener("resize", () => initCanvas(this.refs));
  // }

  render () {
    const { 
      project: p,
      layers,
      tools,
      canvasIsBigger,
      mouse,
      engage,
      updateMousePosition,
      inCanvasArea
    } = this.props;

    // styles
    const style = {
      wrapper: {
        width: `${p.width.size}px`,
        height: `${p.height.size}px`,
        padding: canvasIsBigger ? '100px' : null
      }
    }

    return (
      <div className="canvas-wrapper" style={style.wrapper}>

        { layers.map((e, i) => (
          <canvas key={e.id} 
            ref={`layer_${e.id}`} 
            className={`layer-${e.id}`}
            width={p.width.size} 
            height={p.height.size}/>
        )) }

        {/* { (inCanvasArea) && <Cursor tools={tools} mouse={mouse} zIndex={1} /> } */}

        <canvas className="touch-overlay" 
          width={p.width.size} 
          height={p.height.size}
          onMouseDown={(e) => engage(this.refs[`layer_${p.canvasLayer}`], e)}
          onMouseMove={(e) => updateMousePosition(e)}/>

      </div>
    );
  }
}

Canvas.propTypes = {
  project: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  mouse: PropTypes.object.isRequired,
  engage: PropTypes.func.isRequired,
  updateMousePosition: PropTypes.func.isRequired,
};

export default Canvas;