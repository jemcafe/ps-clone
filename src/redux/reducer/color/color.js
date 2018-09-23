import { 
  color 
} from '../../../helpers/color';

import { 
  SELECT_COLOR,
  RESET_COLORS,
  SWAP_COLORS,
  UPDATE_COLOR,
  UPDATE_COLOR_POSITION
} from './actions';

const initialState = {
  initiated: false,
  selected: 'frgd',
  frgd: color({ r: 0, b: 0, g: 0 }),
  bkgd: color({ r: 255, b: 255, g: 255 })
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case SELECT_COLOR:
      return payload(state);
    case RESET_COLORS:
      return payload(state, initialState);
    case SWAP_COLORS:
      return payload(state);
    case UPDATE_COLOR:
      return payload(state);
    case UPDATE_COLOR_POSITION:
      return payload(state);
    default:
      return state;
  }
}