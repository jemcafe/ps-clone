import React, { Fragment as Aux } from 'react';
import Brush from './Brush';

function Cursor (props) {
  const { tools: t } = props;

  return (
    <Aux>
      { t.paintBrush.selected && <Brush radius={t.paintBrush.radius} {...props} /> }
      { t.eraser.selected && <Brush radius={t.eraser.radius} {...props} /> }
    </Aux>
  );
}

export default Cursor;