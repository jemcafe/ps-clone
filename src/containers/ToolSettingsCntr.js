import React from 'react';

import { connect } from 'react-redux';
import { updateBrushRadius, updateOpacity, updateStrokeWidth, zoom } from '../redux/reducer/tools/actions';

import ToolSettings from '../components/ToolSettings/ToolSettings';

function ToolSettingsCntr (props) {
  return (
    <ToolSettings {...props} />
  );
}

const mapStateToProps = (state) => ({
  tools: state.tools 
});

const mapDispatchToProps = {
  updateBrushRadius,
  updateOpacity,
  updateStrokeWidth,
  zoom
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolSettingsCntr);