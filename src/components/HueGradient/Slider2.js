import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Slider extends Component {
  constructor () {
    super();
    this.state = { 
      dragging: false
    }
  }

  engage = () => {
    this.setState({ dragging: true });
  }

  render () {
    const { min, max, onChange } = this.props;
    console.log('HANDLE', this.state.dragging);

    const style = {
      handle: {
        top: 40
      }
    }

    return (
      <div ref="slider" className="color-slider">
        <div 
          className="handle" 
          style={style.handle}
          onClick={this.engage}></div>
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