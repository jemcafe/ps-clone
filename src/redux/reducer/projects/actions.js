// Action Types
export const CREATE_PROJECT = 'CREATE_PROJECT',
             REMOVE_PROJECT = 'REMOVE_PROJECT',
             CHANGE_TAB = 'CHANGE_TAB',
             ADD_LAYER = 'ADD_LAYER',
             DELETE_LAYER = 'DELETE_LAYER';

// Action Creators
export const createProject = (project) => ({
  type: CREATE_PROJECT,
  payload: (state) => {
    let projects = state.projects;
    const tab = projects.length; 

    // New properties
    project.id = projects.length + 1;
    project.layer = 0;
    project.layers = [{ id: 1, name: 'Layer 1', locked: false }];

    // New array
    projects = [...projects, project];

    console.log('Projects', projects);
    return {...state, projects, tab };
  }
});

export const removeProject = (tab) => ({
  type: REMOVE_PROJECT,
  payload: (state) => {
    let projects = state.projects;
    let t = state.tab;

    // The selected tab changes
    if (t !== 0) {
      if ((tab === projects.length-1 && projects.length > 1 && tab <= t) || (tab < t)) {
        t -= 1;
      }
    }

    // The project is removed
    projects.splice(tab, 1);

    // The project ids are updated
    projects = projects.map((e, i) => { e.id = i + 1; return e; });

    // console.log('Projects', projects, 'tab', t);
    return {...state, projects, tab: t };
  }
});

export const changeTab = (tab) => ({
  type: CHANGE_TAB,
  payload: (state) => ({...state, tab })
});

export const addLayer = () => ({
  type: ADD_LAYER,
  payload: (state) => {
    const { tab } = state;
    const projects = state.projects;
    const id = projects[tab].layers.length + 1;

    projects[tab].layers.push({
      id: id, 
      name: `Layer ${id}`, 
      locked: false
    })

    // console.log('Add Layer');
    console.log('project layers', projects[tab].layers);
    return {...state, projects };
  }
});

export const deleteLayer = () => ({
  type: DELETE_LAYER,
  payload: (state) => {
    const projects = state.projects;

    console.log('Delete Layer');
    // console.log('projects', projects);
    return {...state, projects };
  }
});