import React, { Fragment as Aux } from 'react';
import PropTypes from 'prop-types';

function Toolbar (props) {
  const { 
    items = [], 
    // toggleActive, 
    // isActive,
    openWindow
  } = props;

  // Recursion for displaying the options
  function displayOptions (options) {
    if ( Array.isArray(options) ) {

      return options.map((e, i) => (
        <li key={i} className="option">
          <div className="option-name" onClick={() => action(e)}>{e.name}</div>
          { e.options && <Aux>
            <div className="arrow"><i className="icon-angle-right"></i></div>
            <div className="option-content">
              <ul className="content">
                { displayOptions(e.options) }
              </ul>
            </div></Aux> }
        </li>
      ))

    } else {
      return console.log('Toolbar: options not an array');
    }
  }

  function action (option) {
    return option.window ? openWindow(option.window) : !option.options ? console.log(`${option.name} CLICKED`) : null;
  }

  return (
    <div id="toolbar">
      <ul className="items">
        { items.map((e, i) => (
          <li key={i} className="item">
            <div className="item-content">
              <ul className="content">
                { displayOptions(e.options) }
              </ul>
            </div>
            <div className="item-name" tabIndex={i}>
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