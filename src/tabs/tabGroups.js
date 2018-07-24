import React from 'react';

import History from '../containers/TabContent/HistoryCntr';
import Character from '../containers/TabContent/CharacterCntr';
import Paragraph from '../containers/TabContent/ParagraphCntr';
import Color from '../containers/TabContent/ColorCntr';
import Swatches from '../containers/TabContent/SwatchesCntr';
import Layers from '../containers/TabContent/LayersCntr';

export default {
  '1': [
    {
      id: 1,
      tabs: [
        { name: 'History', content: <History />, menu: ['Step Forward', 'Step Backward'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    },
    {
      id: 2,
      tabs: [
        { name: 'Character', content: <Character />, menu: ['Reset Character'] },
        { name: 'Paragraph', content: <Paragraph />, menu: ['Reset Paragraph'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    }
  ],
  '2': [
    {
      id: 1,
      tabs: [
        { name: 'Color', content: <Color />, menu: ['Hue Box'] },
        { name: 'Swatches', content: <Swatches />, menu: ['New Swatch...'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    },
    {
      id: 2,
      tabs: [
        { name: 'Layers', content: <Layers />, menu: ['New Layer...', 'Duplicate Layer', 'Delete Layer'] }
      ],
      tab: 0,
      isHidden: true,
      isRemoved: false
    }
  ]
};

/* className proptery is optional */