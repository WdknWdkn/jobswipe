import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props): JSX.Element => (
  <div className="container mx-auto p-4 max-w-md">{children}</div>
);
