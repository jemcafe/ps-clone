import React, { Component } from 'react';

class Brush extends Component {
  constructor () {
    super();
    this.state = { isHidden: true }
  }

  toggleDropdown = (e) => {
    this.setState(prev => ({ isHidden: !prev.isHidden }));
  }

  hideDropdown = () => {
    this.setState({isHidden: true})
  }

  render () {
    const classNames = {
      button: this.state.isHidden ? 'dropdown-btn' : 'dropdown-btn-pressed'
    }

    return (
      <li className="brush">
        <div className="brush-select" tabIndex="0" onClick={ this.toggleDropdown } onBlur={ this.hideDropdown }>
          <div><div className="img"></div>23</div>
          <div className={classNames.button}>
            <i className="icon-angle-down"></i>
          </div>
        </div>
        { !this.state.isHidden && 
        <div className="dropdown-container">
          BRUSHES
        </div> }
      </li>
    );
  }
}

export default Brush;