import { createSlice } from '@reduxjs/toolkit';

const initialUsers = [
  { email: "ktidke005@gmail.com", password: "Kshitij@123" },
];

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: initialUsers,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    login(state, action) {
      const { email, password } = action.payload;
      const user = state.users.find(user => user.email === email && user.password === password);
      if (user) {
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = "Invalid credentials";
      }
    },
    logout(state) {
      state.isAuthenticated = false; 
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = userSlice.actions;
export default userSlice.reducer;
