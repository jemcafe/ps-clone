import React, { Component } from 'react';
import Projects from '../components/Projects/Projects';

import { connect } from 'react-redux';
import { removeProject } from '../redux/reducer/projects/actions';

class ProjectsCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      tab: 0 
    }
  }

  changeTab = (index) => {
    this.setState({ tab: index });
  }

  render () {
    return (
      <Projects 
        projects={this.props.projects.projects}
        removeProject={this.props.removeProject}
        tab={this.state.tab} 
        changeTab={this.changeTab} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

const mapDispatchToProps = { 
  removeProject
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCntr);