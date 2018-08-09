import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { selectColor, updateColor } from '../../redux/reducer/color/actions';

import Swatches from '../../components/Panel/Swatches/Swatches';

class SwatchesCntr extends Component {
  constructor () {
    super();
    this.state = {
      history: [],
      colors: []
    }
  }

  componentDidMount () {
    // this.setSwatchColors();
  }

  setSwatchColors = () => {
    
  }

  getColor = (canvas) => {
    const ctx = canvas.getContext('2d');
  }

  render () {
    // Max swatches history is 11

    return (
      <Swatches
        setSwatchColor={ this.setSwatchColor }
        getColor={ this.getColor } />
    );
  }
}

const mapStateToProps = (state) => ({
  color: state.color
});

const mapDispatchToProps = {
  selectColor, 
  updateColor
}

export default connect(mapStateToProps, mapDispatchToProps)(SwatchesCntr);