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
    const borderWidth = parseInt(s.style.borderWidth, 10) * 2;
    this.setState({ 
      height: (s.offsetHeight - borderWidth) - h.offsetHeight,
      width: (s.offsetWidth - borderWidth) - h.offsetWidth
    });
  }

  engage = (e) => {
    const { handle: h } = this.refs;
    this.setState({ 
      dragging: true,
      offsetY: e.clientY - h.offsetTop,
      offsetX: e.clientX - h.offsetLeft
    });
  }

  moveHandle = (e, fire) => {
    const { handle: h } = this.refs;
    const { dragging } = this.state;
    const { min, max, onChange, horizontal } = this.props;
    
    if ((dragging || fire) && !isNaN(min) && !isNaN(max)) {
      e.persist();
      this.setState(prev => {
        let offset = 0;
        let top = 0;
        let left = 0;
        let value = 0;

        if (horizontal) {
          offset = dragging ? prev.offsetX : h.offsetWidth/2;
          left = prev.left + (e.clientX - h.offsetLeft - offset)
          left = left < 0 ? 0 : left > prev.width ? prev.width : left; // boundaries
          value = (left * (max - min))/prev.width;
        } else {
          offset = dragging ? prev.offsetY : h.offsetHeight/2;
          top = prev.top + (e.clientY - h.offsetTop - offset)
          top = top < 0 ? 0 : top > prev.height ? prev.height : top; // boundaries
          value = (top * (max - min))/prev.height;
        }

        value = +(value).toFixed(2) + min;
        value = Math.round(value);

        console.log('VALUE', value);
        onChange(value);
        return { value, top, left };
      });
    }
  }

  disengage = () => {
    this.setState({ dragging: false });
  }

  render () {
    const { 
      radius = 20, 
      onChange, 
      horizontal,
      length
    } = this.props;

    const style = {
      slider: {
        borderWidth: 2,
        margin: '0px 6px',
        width: (length && !isNaN(length) && horizontal) ? length : null,
        height: (length && !isNaN(length) && !horizontal) ? length : null
      },
      handle: { 
        top: !horizontal ? this.state.top : null,
        left: horizontal ? this.state.left : null,
        width: radius,
        height: radius
      }
    }

    return (
      <div 
        ref="slider" 
        className="hue-slider"
        style={style.slider}
        onClick={(e) => this.moveHandle(e, true)}>
        <div 
          ref="handle"
          className="handle" 
          style={style.handle}
          onMouseDown={this.engage}
          onMouseMove={(e) => this.moveHandle(e)}
          onMouseUp={this.disengage}
          onMouseLeave={this.disengage}>
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