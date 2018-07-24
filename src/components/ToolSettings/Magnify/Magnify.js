import React, { Fragment as Aux } from 'react';

import ToolPresets from '../_Settings/ToolPresets';
import Zoom from '../_Settings/Zoom';

function Magnify (props) {
  const { tool } = props;

  return (
    <Aux>
      <ToolPresets icon={'icon-magnify'} />
      <Zoom tool={tool} {...props} />
    </Aux>
  );
}

export default Magnify;