import React from 'react';
import PropTypes from 'prop-types';

function Layers (props) {
  const { 
    project: p, 
    hasProjects,
    addLayer,
    deleteLayer,
    selectLayer,
    lockLayer,
    unlockLayer,
    showLayer
  } = props;

  const style = {
    nameWrapper: (index) => p.layer === index ? { background:'gray' } : null,
    eye: (visible) => !visible ? { visibility:'hidden' } : null
  }

  return (
    <div className="layers">
      <header className="header">
        Lock:&nbsp;
        <button title="Lock Layer" onClick={() => lockLayer()}>
          <i className="icon-lock"></i>
        </button>
      </header>
      <ul>
        { hasProjects && p.layers.map((e, i) => (
          <li key={e.id} className="layer">
            <div className="eye-wrapper" title="Visibilty" onClick={() => showLayer(i)}>
              <div className="eye" style={style.eye(e.visible)}>
                <i className="icon-eye"></i>
              </div>
            </div>
            <div className="name-wrapper" style={style.nameWrapper(i)}>
              <div className="canvas" onClick={() => selectLayer(i)}></div>
              <div className="name" onClick={() => selectLayer(i)}>
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
        <button title="Delete Layer" onClick={() => deleteLayer()}>
          <i className="icon-trash"></i>
        </button>
      </footer>
    </div>
  );
}

Layers.propTypes = {
  project: PropTypes.object.isRequired
}

export default Layers;