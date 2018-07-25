import React, { Component } from 'react';
import NewProject from '../components/Windows/NewProject/NewProject';

import { connect } from 'react-redux';
import { createProject } from '../redux/reducer/projects/actions';

class NewProjectCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Untitled-1',
      width: { size: '1000', units: 'Pixels' },
      height: { size: '1000', units: 'Pixels' },
      resolution: { size: '300', units: 'Pixels' },
      colorMode: { mode: 'RGB' , bit: '8 bit' },
      background: 'white'
    }
  }
  
  handleChange = ({p1, p2}, value) => {
    // p is short for property
    if ( p1 && p2 ) {
      this.setState(prev => {
        prev[p1][p2] = value;
        return { [p1]: prev[p1] };
      });
    } else {
      this.setState({ [p1]: value });
    }
  }

  createProject = (e) => {
    e.preventDefault();
    const { name, width, height, resolution, colorMode, background } = this.state;
    this.props.createProject({
      name,
      width,
      height,
      resolution,
      colorMode,
      background
    });
  }

  closeWindow = (e) => {
    e.preventDefault();
    console.log('CLOSE WINDOW');
  }

  render () {
    return (
      <NewProject 
        state={this.state}
        handleChange={this.handleChange}
        createProject={this.createProject}
        closeWindow={this.closeWindow} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

const mapDispatchToProps = {
  createProject
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectCntr);