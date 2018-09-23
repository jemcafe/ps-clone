import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Slider extends Component {
  constructor () {
    super();
    this.state = { 
      value: 0,
      top: 0,
      left: 0,
      offsetY: 0,
      offsetX: 0,
      height: 0,
      width: 0,
      dragging: false
    }
  }

  componentDidMount () {
    window.addEventListener("resize", this.init);
    this.init();
  }

  componentWillUnmount() { 
    window.removeEventListener("resize", this.init);
  }

  init = () => {
    const { slider: s, handle: h } = this.refs;
    this.setState({ 
      height: s.offsetHeight - h.offsetHeight,
      width: s.offsetWidth - h.offsetWidth
    });
  }

  engage = (e) => {
    const { handle: h } = this.refs;
    this.setState({ 
      dragging: true,
      offsetY: e.clientY - h.offsetTop
    });
  }

  moveHandle = (e, fire) => {
    const { handle: h } = this.refs;
    const { height, offsetY, dragging } = this.state;
    let top = 0; 
    
    if (dragging) {
      console.log(e.clientY);
      // top = (h.offsetTop + offsetY) + ;
      // boundaries
      top = top < 0 ? 0 : top > height ? height : top;
      this.setState({ top });
    }
    if (fire) {
      this.setState(prev => ({
        top: prev.top + (e.clientY - h.offsetTop)
      }));
    }
  }

  disengage = () => {
    this.setState({ dragging: false });
  }

  render () {
    const { 
      min, 
      max, 
      radius = 20, 
      onChange 
    } = this.props;
    console.log('height', this.state.height);
    console.log('width', this.state.width);
    // console.log('offsetY', this.state.offsetY);
    console.log('top', this.state.top);

    const style = {
      handle: { 
        top: this.state.top,
        width: radius,
        height: radius
      }
    }

    return (
      <div 
        ref="slider" 
        className="hue-slider"
        onClick={(e) => this.moveHandle(e, true)}>
        <div 
          ref="handle"
          className="handle" 
          style={style.handle}
          onMouseDown={this.engage}
          onMouseMove={(e) => this.moveHandle(e)}
          onMouseUp={this.disengage}>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Slider;