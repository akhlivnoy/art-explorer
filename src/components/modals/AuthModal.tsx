import { t } from 'i18next';

import { useAuthStore } from '@/store/auth.store';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Muted } from '../ui/typography';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface AuthFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type AuthModalProps<T> = {
  isOpen: boolean;
  headerTitle: string;
  error?: string;
  alternateActionText?: string;
  alternateActionButtonText?: string;
  onAlternateAction: () => void;
  isPending?: boolean;
  submitButtonTitle: string;
  onSubmit: (formData: T) => void;
  onClose?: () => void;
  mode: 'login' | 'register';
};

export const AuthModal = <T,>({
  isOpen,
  headerTitle,
  error,
  alternateActionText,
  alternateActionButtonText,
  onAlternateAction,
  isPending,
  submitButtonTitle,
  onSubmit,
  onClose,
  mode,
}: AuthModalProps<T>) => {
  const { setAuthAction } = useAuthStore();

  const handleClose = () => {
    setAuthAction(null);
    onClose?.();
  };

  const handleSubmit = (event: React.FormEvent<AuthFormElement>) => {
    event.preventDefault();
    const { email, password } = event.currentTarget.elements;

    if (mode === 'register') {
      const username = email.value.split('@')[0];
      onSubmit({
        username,
        email: email.value,
        password: password.value,
      } as T);
    } else {
      const username = email.value.split('@')[0];
      onSubmit({
        username: username,
        password: password.value,
      } as T);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{headerTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">{t('labels.email')}</Label>
              <Input required className="col-span-3" id="email" minLength={3} type="email" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">{t('labels.password')}</Label>
              <Input required className="col-span-3" id="password" minLength={5} type="password" />
            </div>
          </div>

          <DialogDescription className="text-destructive mb-1">{error}</DialogDescription>

          <DialogFooter>
            <div className="flex items-center">
              <Muted>{alternateActionText}</Muted>
              <Button size="sm" type="button" variant="link" onClick={onAlternateAction}>
                {alternateActionButtonText}
              </Button>
            </div>

            <Button disabled={isPending} type="submit">
              {submitButtonTitle}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
