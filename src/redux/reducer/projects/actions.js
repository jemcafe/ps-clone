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
  SHOW_LAYER = 'SHOW_LAYER',
  SAVE_IMAGE_DATA = 'SAVE_IMAGE_DATA',
  UPDATE_SCROLL = 'UPDATE_SCROLL';

// Action Creators
export const selectTab = (tab) => ({
  type: SELECT_TAB,
  payload: (state) => ({...state, tab })
});

export const createProject = (project) => ({
  type: CREATE_PROJECT,
  payload: (state) => {
    let { projects } = state;
    const tab = projects.length;
    const id = newId([...projects].map(e => e.id));

    // New Properties
    project = {
      ...project,
      id: id,
      canvasLayer: 1,
      layer: 0,
      layers: [{ 
        id: 1, 
        name: 'Layer 1',
        visible: true, 
        locked: false, 
        imgData: null,
        opacity: '100%'
      }],
      zoom: '100%',
      scroll: { x: 0, y: 0 }
    }

    // New array
    projects = [...projects, project];

    // console.log('Create project', projects, 'id', project.id);
    return {...state, projects, tab };
  }
});

export const removeProject = (index) => ({
  type: REMOVE_PROJECT,
  payload: (state) => {
    let { projects, tab } = state;

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

export const addLayer = () => ({
  type: ADD_LAYER,
  payload: (state) => {
    // Variables set to state values reference the value in state, unless they're set to a new object.
    // Splicing layers makes changes projects since they both reference state.
    const { projects, tab } = state;
    const project = state.projects[tab];
    const layer = project.layer;
    const layers = project.layers;
    const id = newId([...layers].map(e => e.id));

    // New layer added
    layers.splice(layer, 0, { 
      id: id, 
      name: `Layer ${id}`, 
      visible: true, 
      locked: false
    });

    // Canvas layer
    project.canvasLayer = id;

    // console.log('Add Layer', projects[tab].layers);
    return {...state, projects };
  }
});

export const deleteLayer = () => ({
  type: DELETE_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    const layer = project.layer;
    const layers = project.layers;

    // The layer is removed
    layers.splice(layer, 1);

    // If the last layer is the deleted the selcted layer changes
    if (layer > layers.length-1 && layer !== 0) {
      project.layer = layers.length-1;
    }

    // console.log(`Delete Layer ${layer}`, layers);
    return {...state, projects };
  }
});

export const selectLayer = (index) => ({
  type: SELECT_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    const layers = project.layers;

    // layer
    project.layer = index;

    // Canvas layer
    project.canvasLayer = layers[index].id;

    // console.log('Select Layer', projects[tab].layer);
    return {...state, projects };
  }
})

export const lockLayer = () => ({
  type: LOCK_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    const layer = project.layers[project.layer];
    layer.locked = !layer.locked;

    // console.log(`Lock layer ${layer}`, projects[tab].layers[layer].locked);
    return {...state, projects };
  }
})

export const unlockLayer = (index) => ({
  type: UNLOCK_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    const layer = project.layers[index];
    layer.locked = false;

    // console.log(`Unlock layer ${index}`, projects[tab].layers[index].locked);
    return {...state, projects };
  }
})

export const showLayer = (index) => ({
  type: SHOW_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    const layer = project.layers[index];
    layer.visible = !layer.visible;

    // console.log(`Show layer ${index}`, projects[tab].layers[index].visible);
    return {...state, projects };
  }
})

export const saveImageData = (imgData) => ({
  type: SHOW_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    const { layers, layer } = project;
    layers[layer].imgData = imgData;

    // console.log(`Save image data`, projects[tab].layers[layer].imgData);
    return {...state, projects };
  }
})

export const updateScroll = (scroll) => ({
  type: UPDATE_SCROLL,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    project.scroll = scroll;

    // console.log(`Update scroll`, projects[tab].scroll);
    return {...state, projects };
  }
})