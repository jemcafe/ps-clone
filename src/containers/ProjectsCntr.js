import React, { Component } from 'react';
import Projects from '../components/Projects/Projects';

class ProjectsCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      projects: this.props.projects || [],
      tab: 0 
    }
  }

  changeTab = (index) => {
    this.setState({ tab: index });
  }

  render () {
    return (
      <Projects 
        projects={this.state.projects}
        tab={this.state.tab} 
        changeTab={this.changeTab} />
    );
  }
}

export default ProjectsCntr;