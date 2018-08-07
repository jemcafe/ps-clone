import React from 'react';
import Layers from '../../components/Panel/Layers/Layers';

import { connect } from 'react-redux';
import { addLayer, deleteLayer, selectLayer, lockLayer, unlockLayer, showLayer } from '../../redux/reducer/projects/actions';

function LayersCntr (props) {
  const { projects, tab } = props.projects;
  const project = projects[tab] || {};

  return (
    <Layers 
      project={project} 
      hasProjects={projects.length > 0}
      {...props} />
  );
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

const mapDispatchToProps = {
  addLayer,
  deleteLayer,
  selectLayer,
  lockLayer,
  unlockLayer,
  showLayer
}

export default connect(mapStateToProps, mapDispatchToProps)(LayersCntr);