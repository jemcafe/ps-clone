import { 
  CREATE_PROJECT,
  REMOVE_PROJECT,
  SELECT_TAB,
  ADD_LAYER,
  DELETE_LAYER,
  SELECT_LAYER,
  LOCK_LAYER,
  UNLOCK_LAYER,
  SHOW_LAYER
} from './actions';

const initialState = {
  tab: 0,
  projects: [
    {
      id: 1,
      name: 'Untitled-1',
      width: { size: '1000', units: 'Pixels' },
      height: { size: '1000', units: 'Pixels' },
      resolution: { size: '300', units: 'Pixels' },
      colorMode: { mode: 'RGB' , bit: '8 bit' },
      background: 'white',
      layer: 0,
      layers: [
        { id: 1, name: 'Layer 1', visible: true, locked: false },
        { id: 2, name: 'Layer 2', visible: true, locked: false },
        { id: 3, name: 'Layer 3', visible: true, locked: false }
      ],
      zoom: '100%'
    }
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
    case SELECT_TAB:
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
    default:
      return state;
  }
}