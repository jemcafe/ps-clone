import { 
  SELECT_SWATCH,
  ADD_SWATCH
} from './actions';

const initialState = {
  recentColors: [],
  colors: [
    {
      hex: '#000000',
      rgb: { r: 0, g: 0, b: 0 },
      cmyk:{ c: 0, m: 100, y: 100, k: 0 },
      hsl: { h: 0, s: 100, l: 0 },
      lab: { l: 0, a: 0, b: 0 },
      x: 0,
      y: 0
    },
    {
      hex: '#000000',
      rgb: { r: 0, g: 0, b: 0 },
      cmyk:{ c: 0, m: 100, y: 100, k: 0 },
      hsl: { h: 0, s: 100, l: 0 },
      lab: { l: 0, a: 0, b: 0 },
      x: 0,
      y: 0
    }
  ]
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SELECT_SWATCH:
      return payload(state);
    case ADD_SWATCH:
      return payload(state);
    default:
      return state;
  }
}