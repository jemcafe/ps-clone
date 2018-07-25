import React from 'react';
import Layers from '../../components/Panel/Layers/Layers';

import { connect } from 'react-redux';
import { addLayer, deleteLayer, selectLayer, lockLayer, unlockLayer, showLayer } from '../../redux/reducer/projects/actions';

function LayersCntr (props) {
  const { projects, tab } = props.projects;

  return (
    <Layers 
      project={projects[tab]}
      addLayer={props.addLayer}
      deleteLayer={props.deleteLayer}
      selectLayer={props.selectLayer}
      lockLayer={props.lockLayer}
      unlockLayer={props.unlockLayer}
      showLayer={props.showLayer} />
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