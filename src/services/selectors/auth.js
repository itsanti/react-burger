const selectAuthModule = (state) => state.user;

export const selectIsAuthChecked = (state) => selectAuthModule(state).isAuthChecked;

export const selectUser = (state) => selectAuthModule(state).user;
