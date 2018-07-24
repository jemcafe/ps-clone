import React from 'react';

import { connect } from 'react-redux';
import { selectTool } from '../redux/reducer/tools/actions';
import { resetColors, swapColors } from '../redux/reducer/color/actions';

import ToolMenu from '../components/ToolMenu/ToolMenu';

function ToolMenuCntr (props) {
  return (
    <ToolMenu {...props} />
  );
}

const mapStateToProps = (state) => ({
  tools: state.tools,
  color: state.color
});

const mapDispatchToProps = { 
  selectTool,
  resetColors,
  swapColors
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolMenuCntr);