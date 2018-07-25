import React from 'react';
import PropTypes from 'prop-types';

function Layers (props) {
  const { 
    project:{ layer, layers = [] }, 
    addLayer,
    // deleteLayer,
    selectLayer,
    lockLayer,
    unlockLayer,
    showLayer
  } = props;

  const style = {
    nameWrapper: (index) => layer === index ? { background:'gray' } : null,
    eye: (visible) => !visible ? { visibility:'hidden' } : null
  }

  return (
    <div className="layers">
      <header className="header">
        Lock:&nbsp;<button onClick={() => lockLayer()}><i className="icon-lock"></i></button>
      </header>
      <ul>
        { layers.map((e,i) => (
          <li key={e.id} className="layer">
            <div className="eye-wrapper" onClick={() => showLayer(i)}>
              <div className="eye" style={style.eye(e.visible)}>
                <i className="icon-eye"></i>
              </div>
            </div>
            <div className="name-wrapper" style={style.nameWrapper(i)} onClick={() => selectLayer(i)}>
              <div className="canvas"></div>
              <div className="name">
                { e.name }
              </div>
              { e.locked && 
              <div className="lock" onClick={() => unlockLayer(i)}>
                <i className="icon-lock"></i>
              </div> }
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
  project: PropTypes.object.isRequired
}

export default Layers;