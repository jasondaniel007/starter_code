import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  let user = null;

  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    try {
      user = JSON.parse(storedUser);
    } catch {
      user = null;
    }
  }

  return {
    token: token && token !== "undefined" && token !== "null" ? token : null,
    user,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    loginUser: (state, action) => {
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    logout: () => ({ token: null, user: null }),
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
