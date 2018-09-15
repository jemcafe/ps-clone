import React, { Component } from 'react';
import Layers from '../../components/Panel/Layers/Layers';

import { connect } from 'react-redux';
import { addLayer, deleteLayer, selectLayer, lockLayer, unlockLayer, showLayer, updateLayerName } from '../../redux/reducer/projects/actions';

class LayersCntr extends Component {
  constructor (props) {
    super(props);
    const { projects, tab } = this.props.projects;
    this.state = {
      project: projects[tab] || {},
      editName: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { projects, tab } = nextProps.projects;
    return {
      project: {...projects[tab]},
    };
  }

  putLayerImageData = (canvas, layer) => {
    const ctx = canvas.getContext('2d');
    if (layer.imgData) ctx.putImageData(layer.imgData, 0, 0);
  }

  changeName = () => {
    console.log('DOUBLE CLICKED');
    this.setState({ editName: true });
  }

  confirmName = () => {
    console.log('NAME CONFIRMED');
    this.setState({ editName: false });
  }

  render () {
    return (
      <Layers 
        project={this.state.project}
        editName={this.state.editName}
        putLayerImageData={this.putLayerImageData}
        changeName={this.changeName}
        confirmName={this.confirmName}
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
  showLayer,
  updateLayerName
}

export default connect(mapStateToProps, mapDispatchToProps)(LayersCntr);