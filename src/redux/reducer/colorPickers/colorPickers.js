import {
  UPDATE_GRADIENT_HUE,
  UPDATE_GRADIENT_DIMENSIONS
} from './actions';

const initialState = {
  width: 0,
  height: 0,
  hueGradient: {
    rgb: { r: 255, g: 0, b: 0 },
    hex: '#ff0000',
    hue: 0
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
    default:
      return state;
  }
}