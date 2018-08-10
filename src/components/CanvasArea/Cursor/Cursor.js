import React, { Fragment as Aux } from 'react';
import Brush from './Brush';
import Eyedropper from './Eyedropper';
import Pen from './Pen';

function Cursor (props) {
  const { tools: t } = props;

  return (
    <Aux>
      { t.tool === 'paintBrush' && <Brush radius={t.paintBrush.radius} {...props} /> }
      { t.tool === 'eraser'     && <Brush radius={t.eraser.radius} {...props} /> }
      { t.tool === 'eyedropper' && <Eyedropper {...props} /> }
      { t.tool === 'pen'        && <Pen {...props} /> }
    </Aux>
  );
}

export default Cursor;