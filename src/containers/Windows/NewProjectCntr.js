import React, { Component } from 'react';
import NewProject from '../../components/Windows/NewProject/NewProject';

import { connect } from 'react-redux';
import { createProject } from '../../redux/reducer/projects/actions';
import { closeWindow } from '../../redux/reducer/windows/actions';

class NewProjectCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Untitled-1',
      width: { size: '500', units: 'Pixels' },
      height: { size: '500', units: 'Pixels' },
      resolution: { size: '300', units: 'Pixels' },
      colorMode: { mode: 'RGB' , bit: '8 bit' },
      background: '#ffffff'
    }
  }
  
  handleChange = (e, p1, p2) => { // p is short for property
    const value = e.target.value;
    let validSize = /^([0-9]){0,}$/;
    // // const validName = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/A-Za-z0-9]/;

    if ( p2 ) {
      if (p2 === 'size') {

        validSize = validSize.test(value);
        this.setState(prev => {
          prev[p1][p2] = validSize ? value : prev[p1][p2];
          return { [p1]: prev[p1] };
        });

      } else {

        this.setState(prev => {
          prev[p1][p2] = value;
          return { [p1]: prev[p1] };
        });

      }
    } else {
      this.setState({ [p1]: value });
    }
  }

  confirmSize = (p1) => {
    this.setState(prev => {
      const s = +prev[p1].size;
      prev[p1].size = s < 1 ? '1' : s > '6000' ? '6000' : `${s}`;
      return { [p1]: prev[p1] }
    });
  }

  createProject = (e, canvas) => {
    e.preventDefault();
    const { name, width, height, resolution, colorMode, background } = this.state;

    // The image data for the initial layer's background color
    canvas.width = width.size;
    canvas.height = height.size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width.size, height.size);
    const imgData = ctx.getImageData(0, 0, width.size, height.size);

    this.props.createProject({ name, width, height, resolution, colorMode, background }, imgData);
    this.props.closeWindow('newProject');
  }

  closeWindow = (e) => {
    e.preventDefault();
    this.props.closeWindow('newProject');
  }

  render () {
    return (
      <NewProject 
        state={ this.state }
        handleChange={ this.handleChange }
        confirmSize={ this.confirmSize }
        createProject={ this.createProject }
        closeWindow={ this.closeWindow } />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  windows: state.windows
});

const mapDispatchToProps = {
  createProject,
  closeWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectCntr);