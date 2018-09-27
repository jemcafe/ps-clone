import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { openWindow } from '../redux/reducer/windows/actions';
import { removeProject, removeAllProjects } from '../redux/reducer/projects/actions';

import ToolBar from '../components/ToolBar/ToolBar';

class ToolBarCntr extends Component {
  constructor (props) {
    super(props);
    this.state = {
      items: this.props.items,
      isActive: false,
      projects: this.props.projects.projects,
      tab: this.props.projects.tab
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { 
      projects: nextProps.projects.projects,
      tab: nextProps.projects.tab
    };
  }

  toggleActive = () => {
    this.setState(prev => ({ isActive: !prev.isActive }));
  }

  handleAction = (option) => {
    const { projects: p, tab } = this.state;
    const { openWindow, removeProject, removeAllProjects } = this.props;

    if (!option.options) {

      if (option.window) openWindow(option.window);
      if (option.link)   window.location.href = option.link;

      if (option.action === 'closeProject') {
        if (p.length) removeProject(tab);
      }

      if (option.action === 'closeAllProjects') {
        if (p.length) removeAllProjects();
      }

      console.log(`${option.name} CLICKED`);
      this.toggleActive();
    }
  }

  render () {
    return (
      <ToolBar 
        items={this.state.items}
        isActive={this.state.isActive}
        toggleActive={this.toggleActive}
        handleAction={this.handleAction} />
    );
  }
}

ToolBarCntr.propTypes =  {
  items: PropTypes.array
}

const mapStateToProps = (state) => ({
  windows: state.windows,
  projects: state.projects
})

const mapDispatchToProps = {
  openWindow,
  removeProject,
  removeAllProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBarCntr);