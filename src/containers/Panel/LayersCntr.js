import React from 'react';
import Layers from '../../components/Panel/Layers/Layers';

import { connect } from 'react-redux';
import { addLayer, deleteLayer } from '../../redux/reducer/projects/actions';

function LayersCntr (props) {
  const { projects, tab } = props.projects;
  const layers = projects.length ? projects[tab].layers : [];

  return (
    <Layers 
      layers={layers}
      addLayer={props.addLayer}
      deleteLayer={props.deleteLayer} />
  );
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

const mapDispatchToProps = {
  addLayer,
  deleteLayer
}

export default connect(mapStateToProps, mapDispatchToProps)(LayersCntr);