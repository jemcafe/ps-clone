import { combineReducers } from 'redux';

import tools from './tools/tools';
import color from './color/color';
import focusLayer from './focusLayer/focusLayer';
import projects from './projects/projects';

const reducers = combineReducers({
  tools,
  color,
  focusLayer,
  projects
});

export default reducers;