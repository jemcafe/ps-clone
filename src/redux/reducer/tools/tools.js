import { 
  SELECT_TOOL,
  UPDATE_BRUSH_RADIUS,
  UPDATE_BRUSH,
  UPDATE_OPACITY,
  UPDATE_STROKE_WIDTH,
  ZOOM
} from './actions';

const initialState = {
  tool: 'paintBrush',
  move: {
    select: 'Layer'
  },
  eyedropper: {
    sampleSize: 'Point Sample'
  },
  paintBrush: {
    brush: 'Hard Round',
    radius: '10px',
    opacity: '100%',
    mode: 'Normal'
  },
  eraser: {
    brush: 'Hard Round',
    radius: '10px',
    opacity: '100%',
    mode: 'Brush'
  },
  paintBucket: {
    opacity: '100%'
  },
  pen: {
    type: 'Path',
    strokeWidth: '1px'
  },
  shape: {
    type: 'Path',
    strokeWidth: '1px'
  },
  magnify: {
    in: true, 
    out: false
  },
  hand: {
    
  },
  ellipsis: {

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
