import { User } from '@/api/models/user';
import { Nullable } from '@/types/nullable';
import { createStoreWithMiddlewares } from '@/utils/createStore';

type AuthState = {
  user: Nullable<User>;
  authAction: Nullable<'sign-in' | 'sign-up'>;
};

const INITIAL_STATE: AuthState = {
  user: null,
  authAction: null,
};

type AuthActions = {
  setUser: (user: User) => void;
  updateUsername: (username: string) => void;
  logout: () => void;
  setAuthAction: (action: AuthState['authAction']) => void;
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
    setAuthAction(state, action) {
      state.authAction = action;
    },
  },
  persistOptions: {
    partialize(state) {
      return {
        user: state.user,
      };
    },
  },
});
