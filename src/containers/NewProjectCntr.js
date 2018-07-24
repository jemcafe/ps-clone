import React, { Component } from 'react';
import NewProject from '../components/Window/NewProject/NewProject';

class NewProjectCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      name: 'Untitled-1',
      width: { size: '1000', units: 'Pixels' },
      height: { size: '1000', units: 'Pixels' },
      resolution: { size: '300', units: 'Pixels' },
      colorMode: { mode: 'RGB' , bit: '8 bit' },
      background: 'white',
      isHidden: true
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
  }

  closeWindow = () => {
    this.setState({ isHidden: true });
  }

  render () {
    console.log('state', this.state);
    
    return (
      <NewProject 
        state={this.state}
        handleChange={this.handleChange}
        createProject={this.createProject}
        closeWindow={this.closeWindow} />
    );
  }
}

export default NewProjectCntr;