/* Variables set to a state value references that value in state, unless that value is set to a new object. Whatever change to is made to that variable, changes the reference value. */

// Helpers
import { newId, newProject, newLayer } from './helpers';

// Action Types
export const 
  CREATE_PROJECT = 'CREATE_PROJECT',
  REMOVE_PROJECT = 'REMOVE_PROJECT',
  REMOVE_ALL_PROJECTS = 'REMOVE_ALL_PROJECTS',
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

export const createProject = (project, imgData) => ({
  type: CREATE_PROJECT,
  payload: (state) => {
    let { projects } = state;
    const tab = projects.length;
    const id = newId([...projects].map(e => e.id));

    // A new project is added
    projects = [...projects, newProject(id, project, imgData)];

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

export const removeAllProjects = () => ({
  type: REMOVE_ALL_PROJECTS,
  payload: (state) => ({...state, tab: 0, projects: [] })
});

export const addLayer = () => ({
  type: ADD_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    let layer = null, layers = null, id = null;

    if (projects.length && project.layers) {
      layer = project.layer;
      layers = project.layers;
      id = newId([...layers].map(e => e.id));

      // New layer added
      layers.splice(layer, 0, newLayer(id));

      // Canvas layer
      project.canvasLayer = id;
    }

    // console.log('Add Layer', projects[tab].layers);
    return {...state, projects };
  }
});

export const deleteLayer = () => ({
  type: DELETE_LAYER,
  payload: (state) => {
    const { projects, tab } = state;
    const project = projects[tab];
    let layer = null, layers = null;

    if (projects.length && project.layers) {
      layer = project.layer;
      layers = project.layers;

      // The layer is removed
      layers.splice(layer, 1);

      // If the last layer is the deleted the selcted layer changes
      if (layer > layers.length-1 && layer !== 0) {
        project.layer = layers.length-1;
      }
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
    let layer = null;

    if (projects.length && project.layers) {
      layer = project.layers[project.layer];
      layer.locked = !layer.locked;
    }

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