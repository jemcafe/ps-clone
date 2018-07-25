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
          <li key={e.id} className="layer">
            <div className="eye">
              <div><i className="icon-eye"></i></div>
            </div>
            <div className="canvas"></div>
            <div className="name">{ e.name }</div>
          </li>
        )) }
      </ul>
      <footer className="footer">
        <div title="New Layer"><i className="icon-new-layer"></i></div>
      </footer>
    </div>
  );
}

// Layers.propTypes = {
//   layers: PropTypes.array.isRequired
// }

export default Layers;