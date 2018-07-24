import React, { Fragment as Aux } from 'react';

import ToolPresets from '../_Settings/ToolPresets';
import ShapeType from '../_Settings/ShapeType';
import ShapeStyle from '../_Settings/ShapeStyle';

function Pen (props) {
  const { tool } = props;

  return (
    <Aux>
      <ToolPresets icon={'icon-pen'} />
      <ShapeType tool={tool} />
      <ShapeStyle tool={tool} {...props} />
    </Aux>
  );
}

export default Pen;