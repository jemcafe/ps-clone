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

  handleAction = (option) => {
    if ( option.window ) {
      this.props.openWindow(option.window);
      this.toggleActive();
    } else if ( !option.options ) {
      console.log(`${option.name} CLICKED`);
    };

  }

  render () {
    return (
      <ToolBar 
        items={this.state.items}
        isActive={this.state.isActive}
        toggleActive={this.toggleActive}
        handleAction={this.handleAction} />
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