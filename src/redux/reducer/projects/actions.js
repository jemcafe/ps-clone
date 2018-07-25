// Action Types
export const CREATE_PROJECT = 'CREATE_PROJECT',
             REMOVE_PROJECT = 'REMOVE_PROJECT',
             CHANGE_TAB = 'CHANGE_TAB';

// Action Creators
export const createProject = (project) => ({
  type: CREATE_PROJECT,
  payload: (state) => {
    let projects = state.projects;
    project.id = projects.length + 1; // Is given and id
    projects = [...projects, project];

    console.log('Projects', projects);
    return {...state, projects };
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

    console.log('Projects', projects, 'tab', t);
    return {...state, projects, tab: t };
  }
});

export const changeTab = (tab) => ({
  type: CHANGE_TAB,
  payload: (state) => {
    console.log('tab', tab);
    return {...state, tab };
  }
});