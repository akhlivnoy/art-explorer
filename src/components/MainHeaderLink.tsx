import { createLink, LinkComponent } from '@tanstack/react-router';
import React from 'react';

import { cn } from '@/lib/utils';

type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {};

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>((props, ref) => {
  return <a ref={ref} {...props} className={cn(props.className, 'text-2xl')} />;
});

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const MainHeaderLink: LinkComponent<typeof BasicLinkComponent> = props => {
  return <CreatedLinkComponent activeProps={{ className: 'font-semibold' }} {...props} />;
};
