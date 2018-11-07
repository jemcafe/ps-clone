import React from 'react';

import History from '../containers/Panel/HistoryCntr';
import Character from '../containers/Panel/CharacterCntr';
import Paragraph from '../containers/Panel/ParagraphCntr';
import Color from '../containers/Panel/ColorCntr';
import Swatches from '../containers/Panel/SwatchesCntr';
import Layers from '../containers/Panel/LayersCntr';

/* className property is optional */

const properties = {
  tabIndex: 0,
  isHidden: true,
  isRemoved: false
};

export default {
  '1': [
    { 
      id: 1,
      tabs: [
        { 
          name: 'History',
          content: <History />,
          options: [
            { name: 'Step Forward',
              action: 'step_forward'
            },
            { name: 'Step Backward',
              action: 'step_backward'
            }
          ],
          optionsVisible: false,
          icon: 'icon-history'
        }
      ],
      ...properties
    },
    {
      id: 2,
      tabs: [
        { 
          name: 'Character',
          content: <Character />,
          options: [
            { name: 'Reset Character',
              action: 'reset_character'
            }
          ],
          optionsVisible: false,
          icon: 'icon-character'
        },
        { 
          name: 'Paragraph',
          content: <Paragraph />,
          options: [
            { name: 'Reset Paragraph',
              action: 'reset_paragraph'
            }
          ],
          optionsVisible: false,
          icon: 'icon-paragraph'
        }
      ],
      ...properties
    }
  ],
  '2': [
    {
      id: 3,
      tabs: [
        { 
          name: 'Color',
          content: <Color />,
          options: [
            { name: 'Hue Box' }
          ],
          optionsVisible: false,
          icon: 'icon-color'
        },
        { 
          name: 'Swatches',
          content: <Swatches />,
          options: [
            { name: 'New Swatch...',
              action: 'new_swatch'
            }
          ],
          optionsVisible: false,
          icon: 'icon-swatches'
        }
      ],
      ...properties
    },
    {
      id: 4,
      tabs: [
        {
          name: 'Layers',
          content: <Layers />,
          options: [
            { name: 'New Layer...',
              action: 'new_layer'
            },
            { name: 'Duplicate Layer',
              action: 'duplicate_layer'
            },
            { name: 'Delete Layer',
              action: 'delete_layer'
            }
          ],
          optionsVisible: false,
          icon: 'icon-layers'
        }
      ],
      ...properties
    }
  ]
};