import { color } from '../../../helpers/color';

import { 
  // Color
  SELECT_COLOR,
  RESET_COLORS,
  SWAP_COLORS,
  UPDATE_COLOR,
  UPDATE_COLOR_POSITION,

  // Color Pickers
  UPDATE_GRADIENT_HUE,
  UPDATE_GRADIENT_DIMENSIONS
} from './actions';

const initialState = {
  selected: 'frgd',
  frgd: color({ 
    r: 0, 
    b: 0, 
    g: 0 
  }),
  bkgd: color({ 
    r: 255, 
    b: 255, 
    g: 255 
  }),
  colorPickers: {
    width: 0,
    height: 0,
    hueGradient: {
      rgb: { r: 255, g: 0, b: 0 },
      hex: '#ff0000',
      hue: 0
    },
    
  }
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    // Color
    case SELECT_COLOR:
      return payload(state);
    case RESET_COLORS:
      return payload(state);
    case SWAP_COLORS:
      return payload(state);
    case UPDATE_COLOR:
      return payload(state);
    case UPDATE_COLOR_POSITION:
      return payload(state);

    // Color pickers
    case UPDATE_GRADIENT_HUE: 
      return payload(state);
    case UPDATE_GRADIENT_DIMENSIONS: 
      return payload(state);
    default:
      return state;
  }
}