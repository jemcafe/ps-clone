import { 
  color 
} from '../../../helpers/color';

import { 
  SELECT_COLOR,
  RESET_COLORS,
  SWAP_COLORS,
  UPDATE_COLOR
} from './actions';

const initialState = {
  initiated: false,
  selected: 'frgd',
  frgd: color({ 
    r: 85, 
    b: 30, 
    g: 120 
  }),
  bkgd: color({ 
    r: 255, 
    b: 45, 
    g: 25 
  })
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case SELECT_COLOR:
      return payload(state);
    case RESET_COLORS:
      return payload(state);
    case SWAP_COLORS:
      return payload(state);
    case UPDATE_COLOR:
      return payload(state);
    default:
      return state;
  }
}