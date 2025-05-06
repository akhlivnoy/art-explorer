import { useRouter } from '@tanstack/react-router';

import { useAuthStore } from '@/store/auth.store';
import { useFavoritesStore } from '@/store/favorites.store';

import { AuthApi } from '../endpoints/auth.api';
import { useApiMutation } from '../utils';

export const useLogin = () => {
  const { setUser, setAuthAction } = useAuthStore();
  const router = useRouter();

  return useApiMutation({
    mutationKey: ['login'],
    mutationFn: AuthApi.login,
    onSuccess: data => {
      setAuthAction(null);
      setUser(data.user);
      setTimeout(router.invalidate);
    },
  });
};

export const useRegister = () => {
  const { setUser, setAuthAction } = useAuthStore();
  const router = useRouter();

  return useApiMutation({
    mutationKey: ['register'],
    mutationFn: AuthApi.register,
    onSuccess: data => {
      setAuthAction(null);
      setUser(data.user);
      setTimeout(router.invalidate);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  return useApiMutation({
    mutationKey: ['logout'],
    mutationFn: AuthApi.logout,
    onSuccess() {
      logout();

      // Clear locally stored favorites on logout
      useFavoritesStore.getState().clearFavorites();

      setTimeout(router.invalidate);
    },
  });
};
