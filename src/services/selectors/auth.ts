import { RootState } from '../../utils/types';
import { NonNullableUser, UserState } from '../reducers/auth';

const selectAuthModule = (state: RootState) => state.user as UserState<NonNullableUser>;

export const selectIsAuthChecked = (state: RootState) => selectAuthModule(state).isAuthChecked;

export const selectUser = (state: RootState) => selectAuthModule(state).user;
