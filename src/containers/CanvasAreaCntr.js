import React, { Component } from 'react';

import { connect } from 'react-redux';

import CanvasArea from '../components/CanvasArea/CanvasArea';

class CanvasAreaCntr extends Component {
  constructor () {
    super();
    this.state = { }
  }

  render() {
    const { projects, tab } = this.props.projects;
    const project = projects[tab];
    console.log('CanvasArea project:', project);

    return (
      <CanvasArea project={project} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  tools: state.tools
});

// const mapDispatchToProps = { }

export default connect(mapStateToProps)(CanvasAreaCntr);