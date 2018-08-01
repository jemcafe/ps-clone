import React, { Component } from 'react';

import { connect } from 'react-redux';

import CanvasArea from '../components/CanvasArea/CanvasArea';

class CanvasAreaCntr extends Component {
  constructor () {
    super();
    this.state = { 
      width: 0,
      height: 0,
      offset: { top: 0, left: 0, height: 0, width: 0 },
      mouse: { x: 0, y: 0 },
      hasLayers: false,
      canvasIsBigger: false,
      inCanvasArea: false
    }
  }

  // New lifecycle that replaces componentWillReceiveProps. It must return a new state. It does not have access to the "this".
  static getDerivedStateFromProps(nextProps, prevState) {
    const { width, height } = prevState;
    const { projects, tab } = nextProps.projects;
    const p = projects[tab];

    return {
      hasLayers: p.layers.length > 0,
      canvasIsBigger: (p.width.size > width || p.height.size > height) ? true : false 
    };
  }

  updateDimensions = (refs) => {
    const { canvasArea: ca } = refs;
    if (ca) {
      this.setState(prev => ({ 
        width: ca.clientWidth,
        height: ca.clientHeight,
        offset: { 
          top: ca.offsetTop, 
          left: ca.offsetLeft,
          height: ca.offsetHeight + ca.offsetTop,
          width: ca.offsetWidth + ca.offsetLeft
        }
      }));
    }
  }

  updateMousePosition = ({ nativeEvent: e }) => {
    if (e) {
      this.setState(prev => { 
        const outCanvasArea = 
          e.clientY < prev.offset.top ||
          e.clientX < prev.offset.left ||
          e.clientY > prev.offset.height ||
          e.clientX > prev.offset.width;

        return {
          mouse: { 
            x: e.clientX + window.pageXOffset, 
            y: e.clientY + window.pageYOffset
          },
          inCanvasArea: outCanvasArea ? false : true
        }
      });
    }
  }

  render() {
    const { projects, tab } = this.props.projects;
    // console.log('CanvasArea project:', projects[tab]);
    // console.log('CanvasArea dimensions:', this.state.width, this.state.height);
    // console.log('CanvasArea offset:', this.state.offset);
    // console.log('CanvasArea canvasIsBigger:', this.state.canvasIsBigger);
    // console.log('CanvasArea inCanvasArea:', this.state.inCanvasArea);
    // console.log('CanvasArea hasLayers:', this.state.hasLayers);
    // console.log('CanvasArea mouse:', this.state.mouse);

    return (
      <CanvasArea 
        project={projects[tab]}
        focus={this.props.focusLayer.focus}
        mouse={this.state.mouse}
        hasLayers={this.state.hasLayers}
        canvasIsBigger={this.state.canvasIsBigger}
        inCanvasArea={this.state.inCanvasArea}
        updateDimensions={this.updateDimensions}
        updateMousePosition={this.updateMousePosition}  />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  focusLayer: state.focusLayer
});

// const mapDispatchToProps = { }

export default connect(mapStateToProps)(CanvasAreaCntr);