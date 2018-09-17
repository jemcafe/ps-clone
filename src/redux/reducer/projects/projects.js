import { 
  CREATE_PROJECT,
  REMOVE_PROJECT,
  REMOVE_ALL_PROJECTS,
  SELECT_PROJECT,
  ADD_LAYER,
  DELETE_LAYER,
  SELECT_LAYER,
  LOCK_LAYER,
  UNLOCK_LAYER,
  SHOW_LAYER,
  SAVE_IMAGE_DATA,
  UPDATE_SCROLL,
  UPDATE_LAYER_NAME
} from './actions';

const initialState = {
  projectIndex: 0,
  projects: [
    // {
    //   id: 1,
    //   name: 'Untitled-1',
    //   width: { size: '400', units: 'Pixels' },
    //   height: { size: '400', units: 'Pixels' },
    //   resolution: { size: '300', units: 'Pixels' },
    //   colorMode: { mode: 'RGB' , bit: '8 bit' },
    //   background: '#ffffff',
    //   canvasLayer: 3,
    //   layerIndex: 0,
    //   layers: [
    //     { id: 1, name: 'Layer 1', imgData: null, visible: true, locked: false, opacity: '100%' },
    //     { id: 2, name: 'Layer 2', imgData: null, visible: true, locked: false, opacity: '100%' },
    //     { id: 3, name: 'Layer 3', imgData: null, visible: true, locked: false, opacity: '100%' }
    //   ],
    //   zoom: '100%',
    //   scroll: { x: 0, y: 0 }
    // }
  ]
};

// Reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case CREATE_PROJECT:
      return payload(state);
    case REMOVE_PROJECT:
      return payload(state);
    case REMOVE_ALL_PROJECTS:
      return payload(state);
    case SELECT_PROJECT:
      return payload(state);
    case UPDATE_SCROLL:
      return payload(state);
    case ADD_LAYER:
      return payload(state);
    case DELETE_LAYER:
      return payload(state);
    case SELECT_LAYER:
      return payload(state);
    case LOCK_LAYER:
      return payload(state);
    case UNLOCK_LAYER:
      return payload(state);
    case SHOW_LAYER:
      return payload(state);
    case UPDATE_LAYER_NAME:
      return payload(state);
    case SAVE_IMAGE_DATA:
      return payload(state);
    default:
      return state;
  }
}