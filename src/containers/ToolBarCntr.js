import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToolBar from '../components/ToolBar/ToolBar';

class ToolBarCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      items: this.props.items || []
    }
  }

  render () {
    return (
      <ToolBar items={this.state.items} />
    );
  }
}

ToolBarCntr.propTypes =  {
  items: PropTypes.array
}

export default ToolBarCntr;