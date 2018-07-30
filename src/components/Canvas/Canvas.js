import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Canvas extends Component {
  componentDidMount () {
    // const { initCanvas } = this.props;
    // window.addEventListener("resize", () => initCanvas(this.refs));
    // initCanvas(this.refs);
    console.log(this.refs);
  }

  // componentWillUnmount() {
  //   const { initCanvas } = this.props;
  //   window.removeEventListener("resize", () => initCanvas(this.refs));
  // }

  render () {
    const { 
      project: p,
      layers
    } = this.props;

    // styles
    const style = {
      wrapper: {
        width: `${p.width.size}px`,
        height: `${p.height.size}px`
      }
    }

    return (
      <div className="canvas-wrapper" style={style.wrapper}>
      
        { layers.map((e, i) => (
          <canvas key={e.id} 
            ref={`layer_${e.id}`} 
            className={`layer-${e.id}`}
            style={{background:'#ffffff'}}
            width={p.width.size} 
            height={p.height.size}/>
        )) }

        <canvas className="touch-overlay" 
          width={p.width.size} 
          height={p.height.size}/>

      </div>
    );
  }
}

Canvas.propTypes = {
  project: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired
};

export default Canvas;