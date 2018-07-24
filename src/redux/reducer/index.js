import { combineReducers } from 'redux';

import tools from './tools/tools';
import color from './color/color';
import focusLayer from './focusLayer/focusLayer';

const reducers = combineReducers({
  tools,
  color,
  focusLayer
});

export default reducers;