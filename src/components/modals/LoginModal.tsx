import { t } from 'i18next';

import { useLogin } from '@/api/queries/auth.query';
import { LoginBody } from '@/api/types/auth.types';
import { useAuthStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/errorHelpers';

import { AuthModal } from './AuthModal';

export const LoginModal: React.FunctionComponent = () => {
  const { authAction, setAuthAction } = useAuthStore();
  const loginMutation = useLogin();

  const resetMutation = () => {
    loginMutation.reset();
  };

  const handleSubmit = (body: LoginBody) => {
    loginMutation.mutate(body);
  };

  const handleAlternateAction = () => {
    setAuthAction('sign-up');
    resetMutation();
  };

  return (
    <AuthModal<LoginBody>
      alternateActionButtonText={t('buttons.register')}
      alternateActionText={t('labels.dont_have_account')}
      error={getErrorMessage(loginMutation.error)}
      headerTitle={t('labels.login')}
      isOpen={authAction === 'sign-in'}
      isPending={loginMutation.isPending}
      mode="login"
      submitButtonTitle={t('buttons.login')}
      onAlternateAction={handleAlternateAction}
      onClose={resetMutation}
      onSubmit={handleSubmit}
    />
  );
};
