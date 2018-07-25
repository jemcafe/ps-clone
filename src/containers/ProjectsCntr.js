import React, { Component } from 'react';
import Projects from '../components/Projects/Projects';

import { connect } from 'react-redux';
import { removeProject, changeTab } from '../redux/reducer/projects/actions';

class ProjectsCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { }
  }

  render () {
    return (
      <Projects 
        projects={this.props.projects.projects}
        tab={this.props.projects.tab}
        removeProject={this.props.removeProject}
        changeTab={this.props.changeTab} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

const mapDispatchToProps = { 
  removeProject,
  changeTab
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCntr);