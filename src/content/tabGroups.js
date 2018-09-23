import React from 'react';

import History from '../containers/Panel/HistoryCntr';
import Character from '../containers/Panel/CharacterCntr';
import Paragraph from '../containers/Panel/ParagraphCntr';
import Color from '../containers/Panel/ColorCntr';
import Swatches from '../containers/Panel/SwatchesCntr';
import Layers from '../containers/Panel/LayersCntr';

export default {
  '1': [
    { id: 1,
      tabs: [
        { name: 'History', 
          content: <History />, 
          menu: ['Step Forward', 'Step Backward'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    },
    {
      id: 2,
      tabs: [
        { name: 'Character', 
          content: <Character />, 
          menu: ['Reset Character'] },
        { name: 'Paragraph', 
          content: <Paragraph />, 
          menu: ['Reset Paragraph'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    }
  ],
  '2': [
    {
      id: 3,
      tabs: [
        { name: 'Color', 
          content: <Color />, 
          menu: ['Hue Box'] },
        { name: 'Swatches', 
          content: <Swatches />, 
          menu: ['New Swatch...'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    },
    {
      id: 4,
      tabs: [
        { name: 'Layers', 
          content: <Layers />, 
          menu: ['New Layer...', 'Duplicate Layer', 'Delete Layer'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    }
  ]
};

/* className proptery is optional */