import {
  UPDATE_GRADIENT_HUE,
  UPDATE_GRADIENT_DIMENSIONS,
  UPDATE_COLOR_POSITION
} from './actions';

const initialState = {
  hueGradient: {
    // hue: 0,
    // rgb: { r: 255, g: 0, b: 0 },
    // hex: '#ff0000',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
}

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_GRADIENT_HUE: 
      return payload(state);
    case UPDATE_GRADIENT_DIMENSIONS: 
      return payload(state);
    case UPDATE_COLOR_POSITION: 
      return payload(state);
    default:
      return state;
  }
}