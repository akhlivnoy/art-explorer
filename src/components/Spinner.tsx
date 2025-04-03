import SpinnerIcon from '@/assets/spinner.svg?react';

type SpinnerProps = {
  show?: boolean;
  wait?: `delay-${number}`;
};

export const Spinner: React.FunctionComponent<SpinnerProps> = ({ show, wait }) => {
  return (
    <div
      className={`inline-block animate-spin px-3 transition ${
        (show ?? true) ? `opacity-100 duration-500 ${wait ?? 'delay-300'}` : 'opacity-0 delay-0 duration-500'
      }`}
    >
      <SpinnerIcon width={36} />
    </div>
  );
};
