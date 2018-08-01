// Action types
export const 
  SELECT_TOOL = 'SELECT_TOOL',
  UPDATE_BRUSH_RADIUS = 'UPDATE_BRUSH_RADIUS',
  UPDATE_BRUSH = 'UPDATE_BRUSH',
  UPDATE_OPACITY = 'UPDATE_OPACITY',
  UPDATE_STROKE_WIDTH = 'UPDATE_STROKE_WIDTH',
  ZOOM = 'ZOOM';

// Action creators
export const selectTool = (tool) => ({
  type: SELECT_TOOL,
  payload: (state) => ({...state, tool })
});

export const updateBrushRadius = (value) => ({
  type: UPDATE_BRUSH_RADIUS,
  payload: (state) => {
    const { tool } = state;
    const newObj = {...state[tool]};
    newObj.radius = value;

    return {...state, [tool]: newObj }
  }
});

export const updateBrush = (value) => ({
  type: UPDATE_BRUSH,
  payload: (state) => {
    const { tool } = state;
    const newObj = {...state[tool]};
    newObj.brush = value;

    return {...state, [tool]: newObj }
  }
});

export const updateOpacity = (value) => ({
  type: UPDATE_OPACITY,
  payload: (state) => {
    const { tool } = state;
    const newObj = {...state[tool]};
    newObj.opacity = value;

    return {...state, [tool]: newObj }
  }
})

export const updateStrokeWidth = (value) => ({
  type: UPDATE_STROKE_WIDTH,
  payload: (state) => {
    const { tool } = state;
    const newObj = {...state[tool]};
    newObj.strokeWidth = value;

    return {...state, [tool]: newObj }
  }
});

export const zoom = (value) => ({
  type: ZOOM,
  payload: (state) => {
    const { magnify } = state;

    if (value === 'in') {
      magnify.in = true;
      magnify.out = false;
    }
    if (value === 'out') {
      magnify.in = false;
      magnify.out = true;
    }

    return {...state, magnify };
  }
})