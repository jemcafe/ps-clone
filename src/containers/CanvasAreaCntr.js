import React, { Component } from 'react';

import { connect } from 'react-redux';

import CanvasArea from '../components/CanvasArea/CanvasArea';

class CanvasAreaCntr extends Component {
  constructor () {
    super();
    this.state = {
      mouse: { x: 0, y: 0 },
      canvasMouse: { x: 0, y: 0 },
      canvasMouseOffset: { x: 0, y: 0 },
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
    const { canvasArea, canvasWrapper } = refs;

    this.setState(prev => {
      const canvasMouseOffset = {
        x: prev.canvasMouseOffset.x,
        y: prev.canvasMouseOffset.y,
      };

      if (canvasWrapper && canvasArea) {
        console.log('scrollLeft', canvasArea.scrollLeft);
        canvasMouseOffset.x = canvasWrapper.offsetLeft + canvasArea.scrollLeft;
        canvasMouseOffset.y = canvasWrapper.offsetTop + canvasArea.scrollTop;
      }

      return { canvasMouseOffset };
    });
  }

  updateMousePosition = ({ nativeEvent: e }) => {
    if (e) {
      this.setState(prev => {
        const mouse = {
          x: e.clientX + window.pageXOffset,
          y: e.clientY + window.pageYOffset
        };
        const canvasMouse = {
          x: mouse.x + prev.canvasMouseOffset.x,
          y: mouse.y + prev.canvasMouseOffset.y
        };
        return { mouse, canvasMouse };
      });
    }
  }

  detectCanvasArea = (bool) => {
    this.setState({ inCanvasArea: bool });
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
    console.log('CanvasArea canvasMouse:', this.state.canvasMouse);
    console.log('CanvasArea canvasMouseOffset:', this.state.canvasMouseOffset);

    return (
      <CanvasArea 
        project={projects[tab]}
        mouse={this.state.mouse}
        canvasMouse={this.state.canvasMouse}
        hasLayers={this.state.hasLayers}
        canvasIsBigger={this.state.canvasIsBigger}
        inCanvasArea={this.state.inCanvasArea}
        updateDimensions={this.updateDimensions}
        updateMousePosition={this.updateMousePosition}
        detectCanvasArea={this.detectCanvasArea} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

// const mapDispatchToProps = { }

export default connect(mapStateToProps)(CanvasAreaCntr);