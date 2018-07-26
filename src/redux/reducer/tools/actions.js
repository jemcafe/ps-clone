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
  payload: (state) => {
    const property = tool;

    for (let i in state) {
      if (i === property) {
        state[i].selected = true;
      } else {
        state[i].selected = false;
      }
    }

    return {...state, [property]: state[property] };
  }
});

export const updateBrushRadius = (value) => ({
  type: UPDATE_BRUSH_RADIUS,
  payload: (state) => {
    let property = null;

    for (let i in state) {
      if (state[i].selected && state[i].radius) {
        property = i;
        state[i].radius = value;
        // console.log(property, state[i].radius);
      }
    }

    return {...state, [property]: state[property] };
  }
});

export const updateBrush = (value) => ({
  type: UPDATE_BRUSH,
  payload: (state) => {
    let property = null;

    for (let i in state) {
      if (state[i].selected && state[i].brush) {
        property = i;
        state[i].brush = value;
        // console.log(property, state[i].brush);
      }
    }

    return {...state, [property]: state[property] };
  }
});

export const updateOpacity = (value) => ({
  type: UPDATE_OPACITY,
  payload: (state) => {
    let property = null;

    for (let i in state) {
      if (state[i].selected && state[i].opacity) {
        property = i;
        state[i].opacity = value;
        // console.log(property, state[i].opacity);
      }
    }

    return {...state, [property]: state[property] };
  }
})

export const updateStrokeWidth = (value) => ({
  type: UPDATE_STROKE_WIDTH,
  payload: (state) => {
    let tool = '';
    let newObj = {};

    for (let i in state) {
      if (state[i].selected && state[i].strokeWidth ) {
        tool = i;
        newObj = state[i];
        state[i] = null;
        newObj.strokeWidth = value;
        // console.log( i, newObj.strokeWidth );
      }
    }
    
    return {...state, [tool]: newObj };
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