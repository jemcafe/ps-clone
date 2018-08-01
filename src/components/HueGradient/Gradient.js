import React from 'react';
import PropTypes from 'prop-types';

import Cursor from './Cursor';

class Gradient extends Component {
  render () {
    const { 
      mouse,
      inCanvas,
      engage,
      updateMousePosition,
      detectCanvas
    } = this.props;

    return (
      <div ref="wrapper" className="gradient-wrapper" style={{flex:'1',display:'flex'}}>
        <canvas ref="canvas" className="color-canvas" style={{position: 'absolute'}}/>

        { (inCanvas || focus === 'hueGradient') && 
          <Cursor mouse={mouse} zIndex={1} /> }
        
        <canvas ref="touch" className="touch-overlay"
          onMouseDown={(e) => engage(this.refs.canvas, e)}
          onMouseMove={(e) => updateMousePosition(e)}
          onMouseOver={() => detectCanvas(true)}
          onMouseLeave={() => detectCanvas(false)}/>
      </div>
    );
  }
}

Gradient.propTypes = {
  
}

export default Gradient;