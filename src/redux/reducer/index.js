import { combineReducers } from 'redux';

import tools from './tools/tools';
import color from './color/color';
import colorPickers from './colorPickers/colorPickers';
import swatches from './swatches/swatches';
import focusLayer from './focusLayer/focusLayer';
import projects from './projects/projects';
import windows from './windows/windows';

const reducers = combineReducers({
  tools,
  color,
  colorPickers,
  swatches,
  focusLayer,
  projects,
  windows
});

export default reducers;