import React from 'react';
// import PropTypes from 'prop-types';

function Layers (props) {
  return (
    <div className="layers">
      <header className="header">
        HEADER
      </header>
      <ul>
        { props.layers.map((e,i) => (
          <li key={i} className="layer">
            <div className="eye"><div><i className="icon-eye"></i></div></div>
            <div className="canvas"></div>
            <div className="name">{ e.name } { props.layers.length - i }</div>
          </li>
        )) }
      </ul>
      <footer className="footer">
        FOOTER
      </footer>
    </div>
  );
}

// Layers.propTypes = {
//   layers: PropTypes.array.isRequired
// }

export default Layers;