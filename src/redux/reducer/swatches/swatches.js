import swatchColors from '../../../constants/swatchColors';

import { 
  ADD_SWATCH,
  DELETE_SWATCH,
  ADD_RECENT_COLOR
} from './actions';

const initialState = {
  recentColors: [],
  colors: swatchColors
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_SWATCH:
      return payload(state);
    case DELETE_SWATCH:
      return payload(state);
    case ADD_RECENT_COLOR:
      return payload(state);
    default:
      return state;
  }
}