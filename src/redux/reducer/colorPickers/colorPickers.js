import {
  UPDATE_GRADIENT_HUE,
  UPDATE_GRADIENT_DIMENSIONS
} from './actions';

const initialState = {
  hueGradient: {
    hue: {
      rgb: { r: 255, g: 0, b: 0 },
      hex: '#ff0000'
    },
    color: { 
      hex: '#000000',
      rgb: { r: 0, g: 0, b: 0 },
      cmyk:{ c: 0, m: 100, y: 100, k: 0 },
      hsl: { h: 0, s: 100, l: 0 },
      lab: { l: 0, a: 0, b: 0 },
      x: 0,
      y: 0
    },
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
    default:
      return state;
  }
}