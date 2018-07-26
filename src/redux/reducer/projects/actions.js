import { newId } from '../../../helpers/projects';

// Action Types
export const 
  CREATE_PROJECT = 'CREATE_PROJECT',
  REMOVE_PROJECT = 'REMOVE_PROJECT',
  SELECT_TAB = 'SELECT_TAB',
  ADD_LAYER = 'ADD_LAYER',
  DELETE_LAYER = 'DELETE_LAYER',
  SELECT_LAYER = 'SELECT_LAYER',
  LOCK_LAYER = 'LOCK_LAYER',
  UNLOCK_LAYER = 'UNLOCK_LAYER',
  SHOW_LAYER = 'SHOW_LAYER';

// Action Creators
export const createProject = (project) => ({
  type: CREATE_PROJECT,
  payload: (state) => {
    let projects = state.projects;
    const projectIds = [...projects].map(e => e.id);
    const tab = projects.length;
    
    // New properties
    project.id = newId(projectIds);
    project.layer = 0;
    project.layers = [{ 
      id: 1, 
      name: 'Layer 1', 
      locked: false, 
      visible: true 
    }];

    // New array
    projects = [...projects, project];

    // console.log('Create project', projects, 'id', project.id);
    return {...state, projects, tab };
  }
});

export const removeProject = (index) => ({
  type: REMOVE_PROJECT,
  payload: (state) => {
    let projects = state.projects;
    let tab = state.tab;

    // The selected tab changes
    if (tab !== 0) {
      if ((index === projects.length-1 && projects.length > 1 && index <= tab) || (index < tab)) {
        tab -= 1;
      }
    }

    // The project is removed
    projects.splice(index, 1);

    // console.log('Remove project', projects, 'index', index);
    return {...state, projects, tab };
  }
});

export const selectTab = (tab) => ({
  type: SELECT_TAB,
  payload: (state) => ({...state, tab })
});

export const addLayer = () => ({
  type: ADD_LAYER,
  payload: (state) => {
    // Variables set to state values reference the value in state, unless set to a new object.
    // Splicing layers changes projects since it's referencing state.
    const { tab } = state;
    const projects = state.projects;
    const layer = projects[tab].layer;
    const layers = projects[tab].layers;
    const layerIds = [...layers].map(e => e.id);
    const id = newId(layerIds);

    // New layer added
    layers.splice(layer, 0, { 
      id: id, 
      name: `Layer ${id}`, 
      visible: true, 
      locked: false
    });

    // console.log('Add Layer', projects[tab].layers);
    return {...state, projects };
  }
});

export const deleteLayer = () => ({
  type: DELETE_LAYER,
  payload: (state) => {
    const { tab } = state;
    const projects = state.projects;
    let layer = projects[tab].layer;
    const layers = projects[tab].layers;

    // The layer is removed
    layers.splice(layer, 1);

    // If the last layer is the deleted the selcted layer changes
    if (layer > layers.length-1 && layer !== 0) {
      projects[tab].layer = layers.length-1;
    }

    // console.log(`Delete Layer ${layer}`, layers);
    return {...state, projects };
  }
});

export const selectLayer = (index) => ({
  type: SELECT_LAYER,
  payload: (state) => {
    const { tab } = state;
    const projects = state.projects;
    projects[tab].layer = index;

    // console.log('Select Layer', projects[tab].layer);
    return {...state, projects };
  }
})

export const lockLayer = () => ({
  type: LOCK_LAYER,
  payload: (state) => {
    const { tab } = state;
    const projects = state.projects;
    const layer = projects[tab].layer;
    const locked = projects[tab].layers[layer].locked;
    projects[tab].layers[layer].locked = !locked;

    // console.log(`Lock layer ${layer}`, projects[tab].layers[layer].locked);
    return {...state, projects };
  }
})

export const unlockLayer = (index) => ({
  type: UNLOCK_LAYER,
  payload: (state) => {
    const { tab } = state;
    const projects = state.projects;
    projects[tab].layers[index].locked = false;

    // console.log(`Unlock layer ${index}`, projects[tab].layers[index].locked);
    return {...state, projects };
  }
})

export const showLayer = (index) => ({
  type: SHOW_LAYER,
  payload: (state) => {
    const { tab } = state;
    const projects = state.projects;
    const visible = projects[tab].layers[index].visible;
    projects[tab].layers[index].visible = !visible;

    // console.log(`Show layer ${index}`, projects[tab].layers[index].visible);
    return {...state, projects };
  }
})