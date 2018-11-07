import React, { Fragment as Aux } from 'react';
import PropTypes from 'prop-types';

function Toolbar (props) {
  const { 
    items = [], 
    toggleActive, 
    isActive,
    handleAction,
  } = props;

  // Recursion for displaying the options
  function displayOptions (options) {
    if ( Array.isArray(options) ) {
      return options.map((option, i) => (
        <li key={i} className="option">
          <div className="option-name" onClick={() => handleAction(option)}>{option.name}</div>
          { option.options && 
          <Aux>
            <div className="arrow"><i className="icon-angle-right"></i></div>
            <div className="option-menu">
              <ul className="menu">
                { displayOptions(option.options) }
              </ul>
            </div>
          </Aux> }
        </li>
      ))
    } else console.log('Toolbar: options not an array');
  }

  return (
    <div id="toolbar">
      <ul className="items">
        { items.map((e, i) => (
          <li key={i} className="item">
            <div className="item-menu">
              <ul className="menu">
                { isActive && displayOptions(e.options) }
              </ul>
            </div>
            <div className="item-name" tabIndex={i} onClick={toggleActive}>
              { e.name }
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
}

Toolbar.propTypes =  {
  items: PropTypes.array.isRequired
}

export default Toolbar;