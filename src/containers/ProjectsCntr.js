import React, { Component } from 'react';
import Projects from '../components/Projects/Projects';

import { connect } from 'react-redux';
import { removeProject, selectTab } from '../redux/reducer/projects/actions';

class ProjectsCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { }
  }

  removeProject = (e, i) => {
    e.stopPropagation();
    this.props.removeProject(i);
  }

  render () {
    return (
      <Projects 
        projects={this.props.projects.projects}
        tab={this.props.projects.tab}
        removeProject={this.removeProject}
        selectTab={this.props.selectTab} />
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