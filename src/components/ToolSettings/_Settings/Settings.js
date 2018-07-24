import React, { Fragment as Aux } from 'react';

import Brush from './Brush';
import Mode from './Mode';
import Opacity from './Opacity';
import SampleSize from './SampleSize';
import Select from './Select';
import ShapeStyle from './ShapeStyle';
import ShapeType from './ShapeType';
import ToolPresets from './ToolPresets';
import Zoom from './Zoom';

function Settings (props) {
  const { tools } = props;

  const settings = () => {
    for ( i in tools ) {
      return (
        <Aux>
          <Brush tool={tool} {...props} />
          <Mode tool={tool} {...props} />
          <Opacity tool={tool} {...props} />
          <SampleSize tool={tool} {...props} />
          <Select tool={tool} {...props} />
          <ShapeStyle tool={tool} {...props} />
          <ShapeType tool={tool} {...props} />
          <ToolPresets tool={tool} {...props} />
          <Zoom tool={tool} {...props} />
        </Aux>
      )
    } 
  }

  return (
    <ul className="settings">
      { settings }
    </ul>
  );
}

export default Settings;