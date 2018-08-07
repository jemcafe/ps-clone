import React, { Component, Fragment as Aux } from 'react';
import Projects from '../components/Projects/Projects';

import { connect } from 'react-redux';
import { removeProject, selectTab } from '../redux/reducer/projects/actions';

class ProjectsCntr extends Component {
  constructor () {
    super();
    this.state = { height: 0 }
  }

  updateDimensions = (refs) => {
    const { wrapper: w, nav: n } = refs;
    if (w && n) {
      this.setState({ height: w.clientHeight - n.offsetHeight });
    }
  }

  removeProject = (e, i) => {
    e.stopPropagation(); 
    this.props.removeProject(i);
  }

  render () {
    const { projects } = this.props.projects;

    return (
      <Aux>
        { projects.length > 0 &&  
        <Projects 
          projects={ this.props.projects.projects }
          tab={ this.props.projects.tab }
          height={ this.state.height }
          updateDimensions={ this.updateDimensions }
          removeProject={ this.removeProject }
          selectTab={ this.props.selectTab }
          children={ this.props.children } /> }
      </Aux>
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