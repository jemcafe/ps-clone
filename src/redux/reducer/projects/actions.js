// Action Types
export const CREATE_PROJECT = 'CREATE_PROJECT',
             REMOVE_PROJECT = 'REMOVE_PROJECT';

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
    // The project is removed
    projects.splice(tab, 1);

    // Starting at the tab number, every project id is updated
    for (let i = tab; i < projects.length; i++) {
      projects[i].id -= 1;
    }

    console.log('Projects', projects);
    return {...state, projects };
  }
});