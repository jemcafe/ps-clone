import { 
  SELECT_COLOR,
  RESET_COLORS,
  SWAP_COLORS,
  UPDATE_COLOR,
  UPDATE_COLOR_POSITION
} from './actions';

const initialState = {
  color1: {
    hex: '#000000',
    rgb: { r: 0, g: 0, b: 0 },
    cmyk:{ c: 0, m: 100, y: 100, k: 0 },
    hsl: { h: 0, s: 100, l: 0 },
    lab: { l: 0, a: 0, b: 0 },
    x: 0,
    y: 0,
    selected: true
  },
  color2: {
    hex: '#ffffff',
    rgb: { r: 255, g: 255, b: 255 },
    cmyk:{ c: 0, m: 100, y: 100, k: 100 },
    hsl: { h: 0, s: 100, l: 100 },
    lab: { l: 100, a: 0, b: 0 },
    x: 0,
    y: 0,
    selected: false
  }
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