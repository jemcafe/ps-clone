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
    cursor: ' cursor-move',
    select: 'Layer'
  },
  eyedropper: {
    cursor: ' cursor-eyedropper',
    sampleSize: 'Point Sample'
  },
  paintBrush: {
    // cursor: '',
    brush: 'Hard Round',
    radius: '10px',
    opacity: '100%',
    mode: 'Normal'
  },
  eraser: {
    // cursor: '',
    brush: 'Hard Round',
    radius: '10px',
    opacity: '100%',
    mode: 'Brush'
  },
  paintBucket: {
    cursor: ' cursor-paint-bucket',
    opacity: '100%'
  },
  pen: {
    cursor: ' cursor-pen',
    type: 'Path',
    strokeWidth: '1px'
  },
  shape: {
    cursor: ' cursor-crosshair',
    type: 'Path',
    strokeWidth: '1px'
  },
  magnify: {
    cursor: ' cursor-zoom-in',
    zoom: 'in'
  },
  hand: {
    cursor: ' cursor-hand',
    grabbing: false
  },
  ellipsis: {
    cursor: ' cursor-default'
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
