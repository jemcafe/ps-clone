import React from 'react';
// import PropTypes from 'prop-types';

function Projects (props) {
  const {
    projects,
    removeProject,
    tab,
    changeTab
  } = props;

  const classNames = {
    tab: (index) => (
      (tab === index) ? 'selected-tab' : 
      (index < tab)   ? 'left-tab' : 
      (index > tab)   ? 'right-tab' : ''
    )
  };

  const tabList = projects.map((e, i) => (
    <li key={e.id} className={ classNames.tab(i) } onClick={() => changeTab(i)}>
      <div onClick={() => removeProject(i)}><i className="icon-times"></i></div>{ e.name }
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

// Projects.propTypes = {
//   projects: PropTypes.array.isRequired,
//   removeProject: PropTypes.func.isRequired,
//   tab: PropTypes.number.isRequired
//   changeTab: PropTypes.func.isRequired
// }

export default Projects;