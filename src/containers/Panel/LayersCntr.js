import React from 'react';
import Layers from '../../components/Panel/Layers/Layers';

import { connect } from 'react-redux';
import { addLayer, deleteLayer, selectLayer, lockLayer, unlockLayer, showLayer } from '../../redux/reducer/projects/actions';

function LayersCntr (props) {
  const { projects: p, tab } = props.projects;
  const project = p.length ? p[tab] : {};

  return (
    <Layers project={project} {...props} />
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