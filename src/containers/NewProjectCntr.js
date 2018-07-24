import React, { Component } from 'react';
import NewProject from '../components/Window/NewProject/NewProject';

class NewProjectCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { }
  }
  
  handleChange = (property, value) => {
    this.setState({ [property]: value });
  }

  render () {
    return (
      <NewProject />
    );
  }
}

export default NewProjectCntr;