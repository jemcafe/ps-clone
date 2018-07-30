import React, { Component } from 'react';

import Canvas from '../components/Canvas/Canvas';

class CanvasCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      layers: this.props.project.layers.reverse()
    }
  }

  render () {
    console.log('Canvas project:', this.props.project);
    console.log('Canvas refs prop', this.props.refs);

    return (
      <Canvas {...this.props} layers={this.state.layers} />
    );
  }
}

export default CanvasCntr;