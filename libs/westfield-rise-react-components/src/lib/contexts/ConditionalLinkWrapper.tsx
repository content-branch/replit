import { ReactElement, useContext } from 'react'
import { EnvironmentContext } from '../contexts/EnvironmentContext';

interface IConditionalLinkWrapper {
  href: string;
  children: ReactElement;
  isExternal?: boolean;
  prefix?: string;
}

function ConditionalLinkWrapper({
  href,
  children,
  isExternal,
  prefix,
}: IConditionalLinkWrapper) {
  const { Link } = useContext(EnvironmentContext);

  if (!href) return children;

  return (
    <Link prefetch={false} href={href} isExternal={isExternal} prefix={prefix}>
      {children}
    </Link>
  );
}

export default ConditionalLinkWrapper;