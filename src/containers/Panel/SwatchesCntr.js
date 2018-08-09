import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { selectColor, updateColor } from '../../redux/reducer/color/actions';

import Swatches from '../../components/Panel/Swatches/Swatches';

class SwatchesCntr extends Component {
  setSwatchColor = (canvas) => {
    const ctx = canvas.getContext('2d');


  }

  getColor = (canvas) => {
    const ctx = canvas.getContext('2d');
  }

  render () {
    // Max recent swatches is 11

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