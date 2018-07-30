import React, { Component } from 'react';
import Projects from '../components/Projects/Projects';

import { connect } from 'react-redux';
import { removeProject, selectTab } from '../redux/reducer/projects/actions';

class ProjectsCntr extends Component {
  constructor () {
    super();
    this.state = { width: 0 }
  }

  updateDimensions = (refs) => {
    const { wrapper: w } = refs;
    if (w) this.setState({ width: w.clientWidth });
  }

  render () {
    return (
      <Projects 
        width={this.state.width}
        updateDimensions={this.updateDimensions}
        projects={this.props.projects.projects}
        tab={this.props.projects.tab}
        removeProject={this.props.removeProject}
        selectTab={this.props.selectTab}
        children={ this.props.children } />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

const mapDispatchToProps = { 
  removeProject,
  selectTab
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCntr);