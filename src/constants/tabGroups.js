import React from 'react';

import History from '../containers/Panel/HistoryCntr';
import Character from '../containers/Panel/CharacterCntr';
import Paragraph from '../containers/Panel/ParagraphCntr';
import Color from '../containers/Panel/ColorCntr';
import Swatches from '../containers/Panel/SwatchesCntr';
import Layers from '../containers/Panel/LayersCntr';

const tabGroups = {
  '1': setProperties([
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
          icon: 'icon-history'
        }
      ]
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
          icon: 'icon-paragraph'
        }
      ]
    }
  ]),
  '2': setProperties([
    {
      id: 3,
      tabs: [
        { 
          name: 'Color',
          content: <Color />,
          options: [
            { name: 'Hue Box' }
          ],
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
          icon: 'icon-swatches'
        }
      ]
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
          icon: 'icon-layers'
        }
      ]
    }
  ])
};

// Default values for all the tab groups
function setProperties (tabGroup) {
  return tabGroup.map(group => {
    group = {
      ...group,
      tabIndex: 0,
      isHidden: true,
      isRemoved: false
    }
    group.tabs = group.tabs.map(tab => {
      tab.options = [
        ...tab.options,
        { name: 'Close',
          action: 'close_tab' },
        { name: 'Close Tab Group',
          action: 'close_tab_group' }
      ];
      tab.optionsVisible = false;
      return tab;
    })
    return group;
  });
}

console.log('tabGroups', tabGroups)

export default tabGroups;

/*
{
  id: 1,
  className: 'className' (optional)
  tabIndex: 0,
  isHidden: true,
  isRemoved: false
  tabs: [
    {
      name: 'name',
      content: <Component />,
      icon: 'icon'
      optionsVisible: false
      options: [
        {
          name: 'name',
          action: 'action'
        },
        ...
        { name: 'Close',
          action: 'close_tab'
        },
        { name: 'Close Tab Group',
          action: 'close_tab_group'
        }
      ],
    },
    ...
  ]
}
*/

