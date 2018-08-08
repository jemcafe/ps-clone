import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      state:{ mouse, inCanvas },
      colorPair = true, 
      slider = true,
      focus,
      engage, 
      changeHue,
      updateMousePosition,
      detectCanvas,
      color:{ color1, color2 },
      selectColor
    } = this.props;

    const style = {
      color1: color1.selected ? { borderColor: '#d3d3d3' } : null,
      color2: color2.selected ? { borderColor: '#d3d3d3' } : null
    }

    return (
      <div className="hue-gradient">
        { colorPair &&
        <div className="color-pair">
          <div className="color-block-wrapper"><div className="color-block" style={style.color2} onClick={() => selectColor(2)}><div><div style={{ background: color2.hex }}></div></div></div></div>
          <div className="color-block-wrapper"><div className="color-block" style={style.color1} onClick={() => selectColor(1)}><div><div style={{ background: color1.hex }}></div></div></div></div>
        </div> }
        
        <div ref="wrapper" className="gradient-wrapper" style={{flex:'1',display:'flex'}}>
          <canvas ref="canvas" className="color-canvas" style={{position: 'absolute'}}/>

          { (inCanvas || focus === 'hueGradient') && 
            <Cursor mouse={mouse} zIndex={0} /> }
          
          <canvas ref="touch" className="touch-overlay"
            onMouseDown={(e) => engage(this.refs.canvas, e)}
            onMouseMove={(e) => updateMousePosition(e)}
            onMouseOver={() => detectCanvas(true)}
            onMouseLeave={() => detectCanvas(false)}/>
        </div>

        { slider &&
          <Slider min={0} max={255 * 6} onChange={(value) => changeHue({canvas:this.refs.canvas, value})} /> }
      </div>
    );
  }
}

HueGradient.propTypes = {
  state: PropTypes.object.isRequired,
  initCanvas: PropTypes.func.isRequired,
  engage: PropTypes.func.isRequired,
  changeHue: PropTypes.func.isRequired,
  updateMousePosition: PropTypes.func.isRequired,
}

export default HueGradient;