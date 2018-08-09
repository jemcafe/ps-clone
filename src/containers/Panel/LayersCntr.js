import React, { Component } from 'react';
import Layers from '../../components/Panel/Layers/Layers';

import { connect } from 'react-redux';
import { addLayer, deleteLayer, selectLayer, lockLayer, unlockLayer, showLayer } from '../../redux/reducer/projects/actions';

class LayersCntr extends Component {
  constructor (props) {
    super(props);
    const { projects, tab } = this.props.projects;
    const project = projects[tab] || {};

    this.state = {
      project: project
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { projects, tab } = nextProps.projects;
    const project = projects[tab];

    return {
      project: {...project},
    };
  }

  putLayerImageData = (canvas, layer) => {
    const ctx = canvas.getContext('2d');
    if (layer.imgData) ctx.putImageData(layer.imgData, 0, 0);
  }

  render () {
    return (
      <Layers 
        project={this.state.project}
        putLayerImageData={this.putLayerImageData}
        {...this.props} />
    );
  }
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