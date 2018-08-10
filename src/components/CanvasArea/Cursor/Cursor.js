import React, { Fragment as Aux } from 'react';
import Brush from './Brush';
import PaintBucket from './PaintBucket';
import Eyedropper from './Eyedropper';
import Pen from './Pen';
import Magnify from './Magnify';

function Cursor (props) {
  const { tools: t } = props;

  return (
    <Aux>
      { t.tool === 'paintBrush'  && <Brush radius={t.paintBrush.radius} {...props} /> }
      { t.tool === 'eraser'      && <Brush radius={t.eraser.radius} {...props} /> }
      { t.tool === 'paintBucket' && <PaintBucket {...props} /> }
      { t.tool === 'eyedropper'  && <Eyedropper {...props} /> }
      { t.tool === 'pen'         && <Pen {...props} /> }
      { t.tool === 'magnify'     && <Magnify magnify={t.magnify} {...props} /> }
    </Aux>
  );
}

export default Cursor;