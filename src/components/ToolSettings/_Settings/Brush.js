import React, { Component } from 'react';

class Brush extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      radius: this.props.tool.radius,
      isHidden: true 
    }
  }

  toggleDropdown = (e) => {
    this.setState(prev => ({ isHidden: !prev.isHidden }));
  }

  hideDropdown = () => {
    this.setState({isHidden: true})
  }

  handleRangeChange = (e) => {
    const { updateBrushRadius } = this.props;
    const value = `${e.target.value}px`;
    this.setState({ radius: value });
    updateBrushRadius(value);
  }

  confirmRadius = () => {

  }

  render () {
    const { radius, isHidden } = this.state;
    const { tool } = this.props;

    const classNames = {
      button: isHidden ? 'dropdown-btn' : 'dropdown-btn-pressed',
    }

    return (
      <li className="brush">
        <div className="brush-select" tabIndex="0" onClick={ this.toggleDropdown }>
          <div><div className="img"></div>{ parseInt(tool.radius, 10) }</div>

          <div className={classNames.button}>
            <i className="icon-angle-down"></i>
          </div>
        </div>

        { !this.state.isHidden && 
        <div className="dropdown-container">
          <div className="range-wrapper">
            <input ref={input => input && input.focus()} 
              type="range" min="1" max="100" 
              value={ parseInt(tool.radius, 10) } 
              onChange={ this.handleRangeChange }
              onBlur={ this.hideDropdown }/>
          </div>
        </div> }
      </li>
    );
  }
}

export default Brush;