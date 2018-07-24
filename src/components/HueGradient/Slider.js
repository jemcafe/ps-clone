import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Slider extends Component {
  constructor () {
    super();
    this.state = { width: 0 }
  }

  componentDidMount () {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() { 
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    const { slider: s } = this.refs;
    this.setState({ width: s.clientHeight });
  }

  render () {
    const { width } = this.state;
    const { min, max, onChange } = this.props;

    const style = {
      input: { width: width-4 }  // -4 for border
    }

    return (
      <div ref="slider" id="color-slider">
        <input type="range" style={style.input} min={min} max={max} defaultValue="0" 
          onClick={(e) => onChange(e.target.value)}
          onChange={(e) => onChange(e.target.value)}/>
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