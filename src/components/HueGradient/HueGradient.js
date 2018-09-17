import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ColorPair from './ColorPair';
import Cursor from './Cursor';
import Slider from './Slider';

class HueGradient extends Component {
  componentDidMount () {
    const { initCanvas } = this.props;
    window.addEventListener("resize", () => initCanvas(this.refs));
    initCanvas(this.refs);
  }

  componentWillUnmount() {
    const { initCanvas } = this.props;
    window.removeEventListener("resize", () => initCanvas(this.refs));
  }

  render () {
    const { 
      hasColorPair = true, 
      hasSlider = true,
      state:{ mouse, inCanvas },
      focusLayer:{ focus },
      engage, 
      changeHue,
      updateMousePosition,
      detectCanvas,
      color,
      selectColor
    } = this.props;

    const style = {
      wrapper: { flex:'1', display:'flex' },
      canvas: { position: 'absolute' }
    }

    return (
      <div className="hue-gradient">
        { hasColorPair &&
          <ColorPair color={color} selectColor={(selected) => selectColor(this.refs.canvas, selected)} /> }
        
        <div ref="wrapper" className="gradient-wrapper" style={style.wrapper}>
          <canvas ref="canvas" className="color-canvas" style={style.canvas}/>

          { (inCanvas || focus === 'hueGradient') && 
            <Cursor mouse={mouse} zIndex={0} /> }
          
          <canvas ref="touch" 
            className="touch-overlay"
            onMouseDown={(e) => engage(this.refs.canvas, e)}
            onMouseMove={(e) => updateMousePosition(e)}
            onMouseOver={() => detectCanvas(true)}
            onMouseLeave={() => detectCanvas(false)}/>
        </div>

        { hasSlider &&
          <Slider min={0} max={255 * 6} onChange={(value) => changeHue(this.refs.canvas, value)} /> }
      </div>
    );
  }
}

HueGradient.propTypes = {
  state: PropTypes.object.isRequired,
  initCanvas: PropTypes.func.isRequired,
  engage: PropTypes.func.isRequired,
  changeHue: PropTypes.func.isRequired,
}

export default HueGradient;