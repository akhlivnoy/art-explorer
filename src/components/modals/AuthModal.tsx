import { t } from 'i18next';

import { useAuthStore } from '@/store/auth.store';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Muted } from '../ui/typography';

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface AuthFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type AuthModalProps = {
  isOpen: boolean;
  headerTitle: string;
  error?: string;

  alternateActionText?: string;
  alternateActionButtonText?: string;
  onAlternateAction: () => void;

  isPending?: boolean;
  submitButtonTitle: string;
  onSubmit: (formData: { username: string; password: string }) => void;
  onClose?: () => void;
};

export const AuthModal: React.FunctionComponent<AuthModalProps> = ({
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
}) => {
  const { setAuthAction } = useAuthStore();
  const handleClose = () => {
    setAuthAction(null);
    onClose?.();
  };

  const handleSubmit = (event: React.FormEvent<AuthFormElement>) => {
    event.preventDefault();
    const { username, password } = event.currentTarget.elements;
    onSubmit({ username: username.value, password: password.value });
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
              <Label htmlFor="username">{t('labels.username')}</Label>
              <Input className="col-span-3" id="username" minLength={3} type="text" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">{t('labels.password')}</Label>
              <Input className="col-span-3" id="password" minLength={5} type="password" />
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
