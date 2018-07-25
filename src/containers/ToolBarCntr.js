import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { openWindow } from '../redux/reducer/windows/actions';

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
        toggleActive={this.toggleActive}
        openWindow={this.props.openWindow} />
    );
  }
}

ToolBarCntr.propTypes =  {
  items: PropTypes.array
}

const mapStateToProps = (state) => ({
  windows: state.windows
})

const mapDispatchToProps = {
  openWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBarCntr);