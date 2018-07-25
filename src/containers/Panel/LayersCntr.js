import React from 'react';
import Layers from '../../components/Panel/Layers/Layers';

import { connect } from 'react-redux';

function LayersCntr (props) {
  const { projects, tab } = props.projects;
  const layers = projects.length ? projects[tab].layers : [];

  return (
    <Layers layers={layers} />
  );
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

export default connect(mapStateToProps)(LayersCntr);