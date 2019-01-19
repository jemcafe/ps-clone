import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ColorPair from './ColorPair';
import Cursor from './Cursor';
import Slider from './Slider';
// import Slider from './Slider2';

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
      color,
      selectedColor,
      mouse,
      inCanvas,
      focusLayer:{ focus },
      engage, 
      changeHue,
      detectCanvas,
      updateMousePosition,
      selectColor,
      setCanvas
    } = this.props;

    const style = {
      wrapper: { 
        flex:'1', 
        display:'flex' 
      },
      canvas: { 
        position: 'absolute' 
      }
    }

    return (
      <div className="hue-gradient">
        { hasColorPair &&
          <ColorPair 
            color={color} 
            selectColor={selectColor}
            // selectColor={(frgd_bkgd) => selectColor({canvas: this.refs.canvas, frgd_bkgd})}
            setCanvas={() => setCanvas({canvas: this.refs.canvas, hex: selectedColor.hue.hex})} /> }
        
        <div ref="wrapper" className="gradient-wrapper" style={style.wrapper}>

          <canvas 
            ref="canvas"
            className="color-canvas"
            style={style.canvas}/>

          { (inCanvas || focus === 'hueGradient') && 
            <Cursor mouse={mouse} zIndex={1} /> }
          
          <canvas 
            ref="touch"
            className="touch-overlay"
            onMouseDown={(e) => engage(this.refs.canvas, e)}
            onMouseMove={(e) => updateMousePosition(e)}
            onMouseOver={() => detectCanvas(true)}
            onMouseLeave={() => detectCanvas(false)}/>

        </div>

        { hasSlider &&
          <Slider 
            min={0} 
            max={359} 
            radius={20} 
            // horizontal={true}
            // length={100}
            value={selectedColor.hue.hue}
            onChange={(value) => changeHue(this.refs.canvas, value)} /> }
      </div>
    );
  }
}

HueGradient.propTypes = {
  color: PropTypes.object.isRequired,
  selectedColor: PropTypes.object.isRequired,
  mouse: PropTypes.object.isRequired,
  inCanvas: PropTypes.bool.isRequired,
  initCanvas: PropTypes.func.isRequired,
  engage: PropTypes.func.isRequired,
  changeHue: PropTypes.func.isRequired,
  updateMousePosition: PropTypes.func.isRequired,
  setCanvas: PropTypes.func.isRequired,
  selectColor: PropTypes.func.isRequired
}

export default HueGradient;