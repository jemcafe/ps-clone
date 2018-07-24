import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateOpacity } from '../../../redux/reducer/tools/actions';

import Opacity from '../../../components/ToolSettings/_Settings/Opactity';

class OpacityCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isHidden: true,
      input: this.props.tool.opacity
    }
  }

  handleTextChange = (value) => {
    const checkInput = /^([0-9%]){1,}$/;
    const isValid = checkInput.test(value);

    if (isValid || !value.length) {
      this.setState({ input: value });
    }
  }

  handleRangeChange = (value) => {
    const input = `${value}%`;
    this.setState({ input: input });
    this.props.updateOpacity(input);
  }

  handleBlur = () => {
    this.setState(prev => {
      let input = prev.input;
      const checkInput = /^([0-9]){1,}%|([0-9]){1,}$/;
      const isValid = checkInput.test(input);
      const percents = input.split('').find(e => e === '%');
      console.log('percents', percents);

      if ( isValid ) {
        
        if (input === '%') {
          input = '0%';
        } else if (input[input.length-1] !== '%') {
          input = `${input}%`;
        } else if (input.length > 1) {
          input = `${input.slice(0, prev.input.length-1)}%`;
        }

      } else {
        input = this.props.tool.opacity;
      }

      this.props.updateOpacity(input);
      return { input };
    })
  }

  render () {
    console.log('input: ',this.state.input);

    return (
      <Opacity 
        tool={this.props.tool} 
        updateOpacity={this.props.updateOpacity} />
    );
  }
}

OpacityCntr.propTypes = {
  tool: PropTypes.object.isRequired,
  updateOpacity: PropTypes.func.isRequired
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = { updateOpacity }

export default connect(mapStateToProps, mapDispatchToProps)(OpacityCntr);