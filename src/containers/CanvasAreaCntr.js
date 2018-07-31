import React, { Component } from 'react';

import { connect } from 'react-redux';

import CanvasArea from '../components/CanvasArea/CanvasArea';

class CanvasAreaCntr extends Component {
  constructor () {
    super();
    this.state = { 
      width: 0,
      height: 0,
      mouse: { x: 0, y: 0 },
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
      canvasIsBigger: (p.width.size > width || p.height.size > height) ? true : false 
    };
  }

  updateDimensions = (refs) => {
    const { canvasArea: ca } = refs;
    if (ca) {
      this.setState(prev => ({ 
        width: ca.clientWidth,
        height: ca.clientHeight,
      }));
    }
  }

  updateMousePosition = (e) => {
    if (e) {
      this.setState({ mouse: { 
        x: e.clientX + window.pageXOffset, 
        y: e.clientY + window.pageYOffset
      }});
    }
  }

  detectCanvasArea = (bool) => {
    this.setState({ inCanvasArea: bool });
  }

  render() {
    const { projects, tab } = this.props.projects;
    // console.log('CanvasArea project:', projects[tab]);
    // console.log('CanvasArea dimensions:', this.state.width, this.state.height);
    // console.log('CanvasArea canvasIsBigger:', this.state.canvasIsBigger);
    console.log('CanvasArea inCanvasArea:', this.state.inCanvasArea);

    return (
      <CanvasArea 
        project={projects[tab]}
        canvasIsBigger={this.state.canvasIsBigger}
        inCanvasArea={this.state.inCanvasArea}
        mouse={this.state.mouse}
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