import React, { Fragment as Aux } from 'react';
import Brush from './Brush';

function BrushCursor (props) {
  const { tools: t } = props;

  return (
    <Aux>
      { t.tool === 'paintBrush' && <Brush radius={t.paintBrush.radius} {...props} /> }
      { t.tool === 'eraser'     && <Brush radius={t.eraser.radius} {...props} /> }
    </Aux>
  );
}

export default BrushCursor;