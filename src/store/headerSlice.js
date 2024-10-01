import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    title: 'Create Project', 
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload; 
    },
  },
});

export const { setTitle } = headerSlice.actions;
export const selectHeaderTitle = (state) => state.header.title;
export default headerSlice.reducer;
