/* Variables set to a state value references that value in state, unless that value is set to a new object. Whatever change to is made to that variable, changes the reference value. */

// Helpers
import { 
  newProject, 
  newLayer, 
  newId 
} from '../../../helpers/project';

// Action Types
export const 
  CREATE_PROJECT = 'CREATE_PROJECT',
  REMOVE_PROJECT = 'REMOVE_PROJECT',
  REMOVE_ALL_PROJECTS = 'REMOVE_ALL_PROJECTS',
  SELECT_PROJECT = 'SELECT_PROJECT',
  UPDATE_SCROLL = 'UPDATE_SCROLL',
  ADD_LAYER = 'ADD_LAYER',
  DELETE_LAYER = 'DELETE_LAYER',
  SELECT_LAYER = 'SELECT_LAYER',
  LOCK_LAYER = 'LOCK_LAYER',
  UNLOCK_LAYER = 'UNLOCK_LAYER',
  SHOW_LAYER = 'SHOW_LAYER',
  UPDATE_LAYER_NAME = 'UPDATE_LAYER_NAME',
  SAVE_IMAGE_DATA = 'SAVE_IMAGE_DATA';

// Action Creators
export const createProject = (project, imgData) => ({
  type: CREATE_PROJECT,
  payload: (state) => {
    let { projects } = state;
    const projectIndex = projects.length;
    const id = newId([...projects].map(e => e.id));

    // New project added to projects
    projects = [...projects, newProject({id, project, imgData})];

    // console.log('Create Project', projects);
    return {...state, projects, projectIndex };
  }
});

export const removeProject = (index) => ({
  type: REMOVE_PROJECT,
  payload: (state) => {
    let { projects, projectIndex } = state;

    // The projectIndex changes
    if (projectIndex !== 0) {
      if ((index === projects.length-1 && projects.length > 1 && index <= projectIndex) ||
          (index < projectIndex)) {
        projectIndex -= 1;
      }
    }

    // The project is removed
    projects.splice(index, 1);

    // console.log('Remove project', projects, 'index', index);
    return {...state, projects, projectIndex };
  }
});

export const removeAllProjects = () => ({
  type: REMOVE_ALL_PROJECTS,
  payload: (state) => ({...state, projectIndex: 0, projects: [] })
});

export const selectProject = (index) => ({
  type: SELECT_PROJECT,
  payload: (state) => ({...state, projectIndex: index })
});

export const updateScroll = (coordinates) => ({
  type: UPDATE_SCROLL,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const project = projects[projectIndex];
    project.scroll = coordinates;  // { x: 0, y: 0 }

    // console.log(`Update scroll`, projects[projectIndex].scroll);
    return {...state, projects };
  }
});

export const addLayer = () => ({
  type: ADD_LAYER,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const project = projects[projectIndex];
    let layerIndex = null;
    let layers = null;
    let id = null;

    if (projects.length && project.layers) {
      layerIndex = project.layerIndex;
      layers = project.layers;
      id = newId([...layers].map(e => e.id));

      // New layer added
      layers.splice(layerIndex, 0, newLayer({id}));

      // Canvas layer
      project.canvasLayer = id;
    }

    // console.log('Add Layer', projects[projectIndex].layers);
    return {...state, projects };
  }
});

export const deleteLayer = () => ({
  type: DELETE_LAYER,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const project = projects[projectIndex];
    let layerIndex = null
    let layers = null;

    if (projects.length && project.layers) {
      layerIndex = project.layerIndex;
      layers = project.layers;

      // The layer is removed
      layers.splice(layerIndex, 1);

      // If the last layer is the deleted the selcted layer changes
      if (layerIndex > layers.length-1 && layerIndex !== 0) {
        project.layerIndex = layers.length-1;
      }
    }

    // console.log(`Delete Layer ${layerIndex}`, layers);
    return {...state, projects };
  }
});

export const selectLayer = (index) => ({
  type: SELECT_LAYER,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const project = projects[projectIndex];
    const layers = project.layers;

    // layer
    project.layerIndex = index;

    // Canvas layer
    project.canvasLayer = layers[index].id;

    // console.log('Select Layer', projects[projectIndex].layerIndex);
    return {...state, projects };
  }
});

export const lockLayer = () => ({
  type: LOCK_LAYER,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const project = projects[projectIndex];
    let layer = null;

    if (projects.length && project.layers.length) {
      layer = project.layers[project.layerIndex];
      layer.locked = !layer.locked;
    }

    // console.log(`Lock layer ${layer}`, projects[projectIndex].layers[layer].locked);
    return {...state, projects };
  }
});

export const unlockLayer = (index) => ({
  type: UNLOCK_LAYER,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const { layers } = projects[projectIndex];
    layers[index].locked = false;

    // console.log(`Unlock layer ${index}`, projects[projectIndex].layers[index].locked);
    return {...state, projects };
  }
});

export const showLayer = (index) => ({
  type: SHOW_LAYER,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const layer = projects[projectIndex].layers[index];
    layer.visible = !layer.visible;

    // console.log(`Show layer ${index}`, projects[projectIndex].layers[index].visible);
    return {...state, projects };
  }
});

export const updateLayerName = (input) => ({
  type: UPDATE_LAYER_NAME,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const { layers, layerIndex } = projects[projectIndex];
    layers[layerIndex].name = input;

    // console.log(`Update layer name`, projects[projectIndex].layers[projects[projectIndex].layerIndex].name);
    return {...state, projects };
  }
});

export const saveImageData = (imgData) => ({
  type: SAVE_IMAGE_DATA,
  payload: (state) => {
    const { projects, projectIndex } = state;
    const { layers, layerIndex } = projects[projectIndex];
    layers[layerIndex].imgData = imgData;

    // console.log(`Save image data`, projects[projectIndex].layers[layerIndex].imgData);
    return {...state, projects };
  }
});