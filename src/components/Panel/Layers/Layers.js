import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Layers extends Component {
  render () {
    const { 
      project: p,
      editName,
      addLayer,
      deleteLayer,
      selectLayer,
      lockLayer,
      unlockLayer,
      showLayer,
      updateLayerName,
      putLayerImageData,
      changeName,
      confirmName
    } = this.props;

    const style = {
      nameWrapper: (index) => p.layerIndex === index ? { background:'gray' } : null,
      eye: (visible) => !visible ? { visibility:'hidden' } : null
    }
    
    return (
      <div className="layers">
        <header className="header">
          Lock:&nbsp;
          <button title="Lock Layer" onClick={() => lockLayer()}><i className="icon-lock"></i></button>
        </header>
        <ul>
          { p.layers ? p.layers.map((layer, i) => (
            <li key={layer.id} className="layer">
              <div className="eye-wrapper" title="Visibilty" onClick={() => showLayer(i)}>
                <div className="eye" style={style.eye(layer.visible)}>
                  <i className="icon-eye"></i>
                </div>
              </div>
              <div className="name-wrapper" style={style.nameWrapper(i)}>
                <div className="canvas-wrapper" onClick={() => selectLayer(i)}>
                  <canvas 
                    ref={canvas => { if (canvas) putLayerImageData(canvas, layer) }} 
                    width={p.width.size} 
                    height={p.height.size}/>
                </div>

                <div 
                  className="name" 
                  onClick={() => selectLayer(i)} 
                  onDoubleClick={() => changeName()}>
                  { (editName && p.layerIndex === i) ? (
                    <input 
                      ref={e => { if (e) e.focus() }} 
                      type="text" 
                      value={layer.name} 
                      onChange={(e) => updateLayerName(e.target.value)} 
                      onBlur={() => confirmName()}
                      onKeyPress={(e) => e.charCode === 13 && confirmName()}/>
                  ) : (
                    layer.name.length > 12 ? `${layer.name.slice(0,12)}...` : layer.name
                  ) }
                </div>

                { layer.locked && 
                <div className="lock" onClick={() => unlockLayer(i)}>
                  <i className="icon-lock"></i>
                </div> }
              </div>
            </li>
          )) : null }
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
}

Layers.propTypes = {
  project: PropTypes.object.isRequired
}

export default Layers;