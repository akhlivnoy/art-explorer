import { t } from 'i18next';

import { useRegister } from '@/api/queries/auth.query';
import { RegisterBody } from '@/api/types/auth.types';
import { useAuthStore } from '@/store/auth.store';

import { AuthModal } from './AuthModal';

export const RegisterModal: React.FunctionComponent = () => {
  const { authAction, setAuthAction } = useAuthStore();
  const registerMutation = useRegister();

  const resetMutation = () => {
    registerMutation.reset();
  };

  const handleSubmit = (body: RegisterBody) => {
    registerMutation.mutate(body);
  };

  const handleAlternateAction = () => {
    setAuthAction('sign-in');
    resetMutation();
  };

  return (
    <AuthModal
      alternateActionButtonText={t('buttons.login')}
      alternateActionText={t('labels.already_have_account')}
      error={registerMutation.error?.message}
      headerTitle={t('labels.registration')}
      isOpen={authAction === 'sign-up'}
      isPending={registerMutation.isPending}
      submitButtonTitle={t('buttons.register')}
      onAlternateAction={handleAlternateAction}
      onClose={resetMutation}
      onSubmit={handleSubmit}
    />
  );
};
