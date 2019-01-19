import tools from '../../../constants/tools';

import { 
  SELECT_TOOL,
  UPDATE_BRUSH_RADIUS,
  UPDATE_BRUSH,
  UPDATE_OPACITY,
  UPDATE_STROKE_WIDTH,
  ZOOM
} from './actions';

const initialState = {
  tool: 'paintBrush',
  ...tools
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SELECT_TOOL:
      return payload(state);
    case UPDATE_BRUSH_RADIUS:
      return payload(state);
    case UPDATE_BRUSH:
      return payload(state);
    case UPDATE_OPACITY:
      return payload(state);
    case UPDATE_STROKE_WIDTH:
      return payload(state);
    case ZOOM:
      return payload(state);
    default:
      return state;
  }
}
