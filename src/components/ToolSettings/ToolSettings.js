import React from 'react';
import PropTypes from 'prop-types';

import Move from './Move/Move';
import Eyedropper from './Eyedropper/Eyedropper';
import PaintBrush from './PaintBrush/PaintBrush';
import Eraser from './Eraser/Eraser';
import PaintBucket from './PaintBucket/PaintBucket';
import Pen from './Pen/Pen';
import Shape from './Shape/Shape';
import Magnify from './Magnify/Magnify';
import Hand from './Hand/Hand';
import Ellipsis from './Ellipsis/Ellipsis';

function ToolSettings (props) {
  const { tools: t } = props;

  return (
    <div className="tool-settings">
      <ul className="settings">
        { t.tool === 'move'        && <Move tool={t.move} {...props} /> }
        { t.tool === 'eyedropper'  && <Eyedropper tool={t.eyedropper} {...props} /> }
        { t.tool === 'paintBrush'  && <PaintBrush tool={t.paintBrush} {...props} /> }
        { t.tool === 'eraser'      && <Eraser tool={t.eraser} {...props} /> }
        { t.tool === 'paintBucket' && <PaintBucket tool={t.paintBucket} {...props} /> }
        { t.tool === 'pen'         && <Pen tool={t.pen} {...props} /> }
        { t.tool === 'shape'       && <Shape tool={t.shape} {...props} /> }
        { t.tool === 'magnify'     && <Magnify tool={t.magnify} {...props} /> }
        { t.tool === 'hand'        && <Hand tool={t.hand} {...props} /> }
        { t.tool === 'ellipsis'    && <Ellipsis tool={t.ellipsis} {...props} /> }
      </ul>

      <div className="workspace-presets">
        <select defaultValue="Essentials">
          <option>Essentials</option>
          <option>Graphic and Web</option>
          <option>Photography</option>
          <option>Painting</option>
          <option>Motion</option>
          <option>3D</option>
        </select>
      </div>
    </div>
  );
}

ToolSettings.propTypes = {
  tools: PropTypes.object.isRequired,
  updateOpacity: PropTypes.func.isRequired,
  zoom: PropTypes.func.isRequired
}

export default ToolSettings;