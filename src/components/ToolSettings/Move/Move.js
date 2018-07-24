import React, { Fragment as Aux } from 'react';

import ToolPresets from '../_Settings/ToolPresets';
import Select from '../_Settings/Select';

function Move () {
  return (
    <Aux>
      <ToolPresets icon={'icon-move'} />
      <Select />
    </Aux>
  );
}

export default Move;