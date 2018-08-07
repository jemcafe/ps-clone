import React, { Component, Fragment as Aux } from 'react';
import PropTypes from 'prop-types';

import CanvasArea from '../../containers/CanvasAreaCntr';

class Projects extends Component {
  componentDidMount () {
    const { updateDimensions } = this.props;
    window.addEventListener('resize', () => updateDimensions(this.refs));
    updateDimensions(this.refs);
  }

  componentWillUnmount () {
    const { updateDimensions } = this.props;
    window.addEventListener('resize', () => updateDimensions(this.refs));
  }

  render () {
    const {
      height,
      projects: p,
      hasProjects,
      tab,
      removeProject,
      selectTab
    } = this.props;

    const classNames = {
      tab: (index) => (
        (tab === index) ? 'selected-tab' : 
        (index < tab)   ? 'left-tab' : 
        (index > tab)   ? 'right-tab' : ''
      )
    };

    const style = {
      container: hasProjects ? {
        height: `${height}px`
      } : {
        height: '100%'
      }
    }

    const tabList = hasProjects && p.map((project, i) => (
      <li key={project.id} className={ classNames.tab(i) } onClick={() => selectTab(i)}>
        <div onClick={(e) => removeProject(e, i)}><i className="icon-times"></i></div>
        { project.name }
      </li>
    ));

    // canvas area
    // const content = this.props.children;

    return (
      <div ref="wrapper" id="projects">
        { hasProjects && 
        <Aux>
          <nav ref="nav" style={style.nav}>
            <ul className="tabs">{ tabList }</ul>
            <div>
              <div className="double-angle-btn">
                <i className="icon-angle-double-right"></i>
              </div>
            </div>
          </nav>
          <div className="container" style={style.container}>
            {/* { content } */}
            { p.map((e, i) => {
              return tab === i ? <CanvasArea key={e.id} /> : null
            }) }
          </div>
        </Aux> }
      </div>
    );
  }
}

Projects.propTypes = {
  updateDimensions: PropTypes.func,
  projects: PropTypes.array.isRequired,
  tab: PropTypes.number.isRequired,
  removeProject: PropTypes.func.isRequired,
  selectTab: PropTypes.func.isRequired
}

export default Projects;