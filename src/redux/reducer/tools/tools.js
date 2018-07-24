import { 
  SELECT_TOOL,
  UPDATE_BRUSH_RADIUS,
  UPDATE_BRUSH,
  UPDATE_OPACITY,
  UPDATE_STROKE_WIDTH,
  ZOOM
} from './actions';

const initialState = {
  move: {
    selected: false,
    select: 'Layer'
  },
  eyedropper: {
    selected: false,
    sampleSize: 'Point Sample'
  },
  paintBrush: {
    selected: true,
    brush: 'Hard Round',
    radius: 10,
    opacity: '100%',
    mode: 'Normal'
  },
  eraser: {
    selected: false,
    brush: 'Hard Round',
    radius: 10,
    opacity: '100%',
    mode: 'Brush'
  },
  paintBucket: {
    selected: false,
    opacity: '100%'
  },
  pen: {
    selected: false,
    type: 'Path',
    strokeWidth: '1px'
  },
  shape: {
    selected: false,
    type: 'Path',
    strokeWidth: '1px'
  },
  magnify: {
    selected: false,
    in: true, 
    out: false
  },
  hand: {
    selected: false
  },
  ellipsis: {
    selected: false
  }
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
