import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { addRecentColor } from '../../redux/reducer/swatches/actions';

import Swatches from '../../components/Panel/Swatches/Swatches';

class SwatchesCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      recentColors: this.props.swatches.recentColors,
      colors: this.props.swatches.colors
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { recentColors, colors } = nextProps.swatches;
    return {
      recentColors: [...recentColors],
      colors: [...colors],
    };
  }

  getColor = (canvas) => {
    // const ctx = canvas.getContext('2d');
  }

  render () {
    // Max swatches history is 11

    return (
      <Swatches
        recentColors={ this.state.recentColors }
        colors={ this.state.colors }
        addRecentColor={ this.props.addRecentColor} />
    );
  }
}

const mapStateToProps = (state) => ({
  swatches: state.swatches
});

const mapDispatchToProps = {
  addRecentColor
}

export default connect(mapStateToProps, mapDispatchToProps)(SwatchesCntr);