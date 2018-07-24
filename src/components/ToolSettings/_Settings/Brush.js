import React, { Component } from 'react';

class Brush extends Component {
  constructor () {
    super();
    this.state = { isHidden: true }
  }

  render () {
    const classNames = {
      button: this.state.isHidden ? 'dropdown-btn' : 'dropdown-btn-pressed'
    }

    return (
      <li className="brush">
        <div className="brush-select" onClick={() => this.setState(prev =>({isHidden: !prev.isHidden}))}>
          <div><div className="img"></div>23</div>
          <div className={classNames.button}>
            <i className="icon-angle-down"></i>
          </div>
        </div>
        { !this.state.isHidden && 
        <div className="dropdown-container" onMouseLeave={() => this.setState({isHidden: true})}>
          BRUSHES
        </div> }
      </li>
    );
  }
}

export default Brush;