import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Opacity extends Component {
  constructor (props) {
    super(props);
    this.state = {
      input: this.props.tool.opacity,
      isHidden: true
    }
  }

  toggleDropdown = (e) => {
    this.setState(prev => ({ isHidden: !prev.isHidden }));
  }

  hideDropdown = () => {
    this.setState({ isHidden: true });
  }

  handleTextChange = (e) => {
    const value = e.target.value;
    let isValid = /^([0-9%]){1,}$/;
    isValid = isValid.test(value);
    isValid = isValid || !value.length;
    
    if (isValid) this.setState({ input: value });
  }

  handleRangeChange = (e) => {
    const { updateOpacity } = this.props;
    const value = `${e.target.value}%`;
    this.setState({ input: value });
    updateOpacity(value);
  }

  confirmInput = () => {
    const { tool, updateOpacity } = this.props;
    this.setState(prev => {
      let input = prev.input;
      let isValid = /^([0-9]){1,}([%]){0,1}$/;           // Test for valid characters
      isValid = isValid.test(input);                     // Input is tested
      isValid = isValid && (parseInt(input, 10) <= 100); // The value must be less than or equal to 100%
      const n = isValid && input.indexOf('%');           // First '%' char
      isValid = isValid && n !== 0;                      // '%' is not the first char

      if (isValid) {
        // Every character before the first '%' are kept.
        input = input.substring(0, n !== -1 ? n+1 : input.length);
        input = `${parseInt(input, 10)}%`;
      } else {
        input = tool.opacity;
      }

      updateOpacity(input);
      return { input };
    })
  }

  render () {
    const { input, isHidden } = this.state;
    const { tool } = this.props;

    const classNames = {
      button: isHidden ? 'dropdown-btn' : 'dropdown-btn-pressed',
    }

    const style = {
      container: isHidden ? { display: 'none' } : { display: 'block' } 
    }

    console.log('isHidden', isHidden);

    return (
      <li className="opacity">
        Opacity:
        <div className="text-input">
          <input type="text" value={input} 
            onChange={ this.handleTextChange } 
            onFocus={ this.hideDropdown } 
            onKeyPress={(e) => e.charCode === 13 && this.confirmInput()}
            onBlur={ this.confirmInput }/>

          <button className={classNames.button} onClick={ this.toggleDropdown }>
            <i className="icon-angle-down"></i>
          </button>
        </div>
        
        <div className="dropdown-container" style={style.container}>
          <div className="range-wrapper">
            <input ref={input => input && input.focus()} 
              type="range" min="0" max="100" 
              value={parseInt(tool.opacity, 10)} 
              onChange={ this.handleRangeChange }
              onBlur={ this.hideDropdown }/>
          </div>
        </div> 
      </li>
    );
  }
}

Opacity.propTypes = {
  tool: PropTypes.object.isRequired,
  updateOpacity: PropTypes.func.isRequired
}

export default Opacity;