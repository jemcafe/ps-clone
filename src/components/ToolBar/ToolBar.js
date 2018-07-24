import React, { Fragment as Aux } from 'react';
import PropTypes from 'prop-types';

function Toolbar ({ items = [] }) {

  
  
  // Recursion for displaying the options
  function displayOptions (options) {
    if ( Array.isArray(options) ) {

      return options.map((e, i) => (
        <li key={i} className="option">
          <div className="option-name" onClick={() => !e.options ? console.log('OPTION CLICKED') : null}>{e.name}</div>
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
      return console.log('Toolbar: options needs an array');
    }
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
            <div className="item-name">
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