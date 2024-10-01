import { createSlice, nanoid } from '@reduxjs/toolkit';

const saveProjectsToLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const loadProjectsFromLocalStorage = () => {
  const savedProjects = localStorage.getItem('projects');
  return savedProjects ? JSON.parse(savedProjects) : [];
};

const initialState = {
  projects: loadProjectsFromLocalStorage(),
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      const newProject = {
        id: nanoid(),
        ...action.payload,
        status: "Registered", 
      };
      state.projects.push(newProject);
      
      saveProjectsToLocalStorage(state.projects);
    },
    
    deleteProject: (state, action) => {
      const projectId = action.payload;

      state.projects = state.projects.filter(project => project.id !== projectId);
      
      saveProjectsToLocalStorage(state.projects);
    },

    updateProjectStatus: (state, action) => {
      const { id, status } = action.payload;
      const project = state.projects.find(project => project.id === id);
      if (project) {
        project.status = status;
        saveProjectsToLocalStorage(state.projects);
      }
    },

    listProject: (state) => {
      return state.projects;
    },
  },
});

export const { addProject, deleteProject, listProject, updateProjectStatus } = projectSlice.actions;
export default projectSlice.reducer;
