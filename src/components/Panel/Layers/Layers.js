import React from 'react';
import PropTypes from 'prop-types';

function Layers (props) {
  const { 
    layers, 
    addLayer,
    // deleteLayer,
    selectLayer
  } = props;

  return (
    <div className="layers">
      <header className="header">
        Lock:&nbsp;<button><i className="icon-lock"></i></button>
      </header>
      <ul>
        { layers.map((e,i) => (
          <li key={e.id} className="layer">
            <div className="eye">
              <div><i className="icon-eye"></i></div>
            </div>
            <div className="canvas"></div>
            <div className="name" onClick={() => selectLayer(i)}>
              { e.name }
            </div>
          </li>
        )) }
      </ul>
      <footer className="footer">
        <button title="New Layer" onClick={() => addLayer()}>
          <i className="icon-new-layer"></i>
        </button>
      </footer>
    </div>
  );
}

Layers.propTypes = {
  layers: PropTypes.array.isRequired
}

export default Layers;