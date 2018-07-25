import React from 'react';
import Layers from '../../components/Panel/Layers/Layers';

function LayersCntr (props) {
  const layers = [
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' },
    { name: 'Layer' }
  ];

  return (
    <Layers layers={layers} />
  );
}

export default LayersCntr;