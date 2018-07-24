import React, { Component } from 'react';

class ToolPresets extends Component {
  constructor () {
    super();
    this.state = { isHidden: true }
  }

  render () {
    const { icon = '' } = this.props;

    const classNames = {
      button: this.state.isHidden ? 'dropdown-btn' : 'dropdown-btn-pressed',
      icon: icon
    }

    return (
      <li className="tool-presets">
        <div className="tool-select" onClick={() => this.setState(prev =>({isHidden: !prev.isHidden}))}>
          <div className="icon"><i className={classNames.icon}></i></div>
          <div>
            <div className={classNames.button}>
              <i className="icon-angle-down"></i>
            </div>
          </div>
        </div>
        { !this.state.isHidden && 
        <div className="dropdown-container" onMouseLeave={() => this.setState({isHidden: true})}>
          PRESETS
        </div> }
      </li>
    );
  }
}

export default ToolPresets;