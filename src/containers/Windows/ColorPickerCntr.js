import React, { Component } from 'react';
import ColorPicker from '../../components/Windows/ColorPicker/ColorPicker';

import { connect } from 'react-redux';
import { closeWindow } from '../../redux/reducer/windows/actions';

class ColorPickerCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      
    }
  }
  
  handleChange = (e, property) => {
    this.setState({ [property]: e.target.value });
  }

  closeWindow = (e) => {
    e.preventDefault();
    this.props.closeWindow('colorPicker');
  }

  changeColor= (e) => {
    e.preventDefault();
    console.log('change color');
  }

  render () {
    return (
      <ColorPicker 
        state={this.state}
        handleChange={this.handleChange}
        changeColor={this.changeColor}
        closeWindow={this.closeWindow} />
    );
  }
}

const mapStateToProps = (state) => ({
  color: state.color
});

const mapDispatchToProps = {
  closeWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerCntr);