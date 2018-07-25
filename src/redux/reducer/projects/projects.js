import { 
  CREATE_PROJECT,
  REMOVE_PROJECT,
  CHANGE_TAB,
  ADD_LAYER,
  DELETE_LAYER
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
      layers: [
        { id: 1, name: 'Layer 1', locked: false },
        { id: 2, name: 'Layer 2', locked: false },
        { id: 3, name: 'Layer 3', locked: false }
      ]
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
    case CHANGE_TAB:
      return payload(state);
    case ADD_LAYER:
      return payload(state);
    case DELETE_LAYER:
      return payload(state);
    default:
      return state;
  }
}