import { createSlice } from '@reduxjs/toolkit';

// Rehydrate from localStorage on boot
const savedUser = JSON.parse(localStorage.getItem('nsa_user') || 'null');

const initialState = {
    user: savedUser?.user || null,
    role: savedUser?.role || null,   // 'admin' | 'teacher' | 'student'
    isAuthenticated: !!savedUser,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            const { user, role } = action.payload;
            state.user = user;
            state.role = role;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            localStorage.setItem('nsa_user', JSON.stringify({ user, role }));
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('nsa_user');
        },
        clearError(state) {
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
    authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
