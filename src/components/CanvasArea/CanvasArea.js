import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cursor from './Cursor/Cursor';

class CanvasArea extends Component {
  componentDidMount () {
    const { initCanvas, updateCanvasArea } = this.props;
    window.addEventListener("resize", () => updateCanvasArea(this.refs));
    initCanvas(this.refs);
  }

  componentWillUnmount () {
    const { updateCanvasArea } = this.props;
    window.addEventListener("resize", () => updateCanvasArea(this.refs));
  }

  render () {
    const {
      project: p,
      layers,
      tools: t,
      focus,
      hasLayers,
      mouse,
      inCanvas,
      updateCanvasArea,
      updateMousePosition,
      engage,
      detectCanvas
    } = this.props;

    const style = {
      canvasArea: {
        display: 'flex',
        alignItems: 'center'
      },
      canvasWrapper: {
        width: `${p.width.size}px`,
        height: `${p.height.size}px`,
        margin: 'auto',
      },
      layer: (e) => ({
        visibility: e.visible ? 'visible' : 'hidden'
      })
    }

    const classNames = {
      touchOverlay: {
        cursor: (
          t.tool === 'move' ? ' cursor-move' : 
          t.tool === 'hand' ? ' cursor-hand' :
          t.tool === 'eyedropper' ? ' cursor-eyedropper' :
          t.tool === 'pen' ? ' cursor-pen' :
          t.tool === 'shape' ? ' cursor-shape' :
          t.tool === 'magnify' && t.magnify.in ? ' cursor-zoom-in' : 
          t.tool === 'magnify' && t.magnify.out ? ' cursor-zoom-out' : ''
        )
      }
    }

    return (
      <div ref="canvasArea" 
        id="canvas-area"
        style={style.canvasArea}
        onScroll={() => updateCanvasArea(this.refs)}
        onMouseOver={() => updateCanvasArea(this.refs)}
        onMouseMove={(e) => updateMousePosition(e)}>
        
        { hasLayers && 
          <div ref="canvasWrapper" className="canvas-wrapper" style={style.canvasWrapper}>

            { layers.map((e, i) => (
              <canvas key={e.id} 
                ref={`layer_${e.id}`} 
                className={`layer-${e.id}`}
                style={style.layer(e)}
                width={p.width.size} 
                height={p.height.size}/>
            )) }

            { (inCanvas || focus === 'canvas') && 
              <Cursor tools={t} mouse={mouse} zIndex={0} /> }

            <canvas ref="touch" 
              className={`touch-overlay${classNames.touchOverlay.cursor}`}
              style={style.touchOverlay}
              width={p.width.size} 
              height={p.height.size}
              onMouseDown={(e) => engage(this.refs[`layer_${p.canvasLayer}`], e)}
              onMouseMove={(e) => updateMousePosition(e, this.refs)}
              onMouseOver={() => detectCanvas(true)}
              onMouseLeave={() => detectCanvas(false)}/>

          </div> }
      </div>
    );
  }
}

CanvasArea.propTypes = {
  project: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  tools: PropTypes.object.isRequired,
  hasLayers: PropTypes.bool.isRequired,
  mouse: PropTypes.object.isRequired,
  inCanvas: PropTypes.bool.isRequired,
  updateCanvasArea: PropTypes.func.isRequired,
  updateMousePosition: PropTypes.func.isRequired
};

export default CanvasArea;