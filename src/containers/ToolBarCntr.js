import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToolBar from '../components/ToolBar/ToolBar';

class ToolBarCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      items: this.props.items,
      isActive: false
    }
  }

  toggleActive = () => {
    this.setState(prev => ({ isActive: !prev.isActive }));
  }

  render () {
    // console.log('isActive', this.state.isActive);
    
    return (
      <ToolBar 
        items={this.state.items}
        isActive={this.state.isActive}
        toggleActive={this.toggleActive} />
    );
  }
}

ToolBarCntr.propTypes =  {
  items: PropTypes.array
}

export default ToolBarCntr;