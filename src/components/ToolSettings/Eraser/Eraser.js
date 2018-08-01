import React, { Fragment as Aux } from 'react';

import ToolPresets from '../_Settings/ToolPresets';
import Brush from '../_Settings/Brush';
import Mode from '../_Settings/Mode';
import Opacity from '../_Settings/Opacity';

function Eraser (props) {
  const { tool } = props;

  return (
    <Aux>
      <ToolPresets icon={'icon-eraser'} />
      <Brush tool={tool} {...props}/>
      <Mode />
      <Opacity tool={tool} {...props} />
    </Aux>
  );
}

export default Eraser;