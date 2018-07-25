import React from 'react';
import PropTypes from 'prop-types';

function Projects (props) {
  const {
    projects,
    removeProject,
    tab,
    selectTab
  } = props;

  const classNames = {
    tab: (index) => (
      (tab === index) ? 'selected-tab' : 
      (index < tab)   ? 'left-tab' : 
      (index > tab)   ? 'right-tab' : ''
    )
  };

  const tabList = projects.map((project, i) => (
    <li key={project.id} className={ classNames.tab(i) } onClick={() => selectTab(i)}>
      <div onClick={(e) => removeProject(e, i)}>
        <i className="icon-times"></i>
      </div>{ project.name }
    </li>
  ));

  // const content = projects.length ? projects[tab].project : 'NO CONTENT';
  const content = 'NO CONTENT';

  return (
    <div className="projects">
      { projects.length > 0 && 
      <nav>
        <ul className="tabs">{ tabList }</ul>
        <div>
          <div className="double-angle-btn"><i className="icon-angle-double-right"></i></div>
        </div>
      </nav> }
      <div className="container">
        { content }
      </div>
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  removeProject: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
  selectTab: PropTypes.func.isRequired
}

export default Projects;