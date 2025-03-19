import { UserModel } from '@/api/models/user';
import { Nullable } from '@/types/nullable';
import { createStoreWithMiddlewares } from '@/utils/createStore';

type AuthState = {
  user: Nullable<UserModel>;
};

const INITIAL_STATE: AuthState = {
  user: null,
};

type AuthActions = {
  setUser: (user: UserModel) => void;
  updateUsername: (username: string) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = createStoreWithMiddlewares<AuthState, AuthActions>({
  name: 'auth',
  initialState: INITIAL_STATE,
  actions: {
    setUser(state, user) {
      state.user = user;
    },
    updateUsername(state, username) {
      if (state.user) {
        state.user.username = username;
      }
    },
    logout() {
      return INITIAL_STATE;
    },
  },
});
