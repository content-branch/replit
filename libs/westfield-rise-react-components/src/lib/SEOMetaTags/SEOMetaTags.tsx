import { EnvironmentContext } from '../contexts/EnvironmentContext';
import { useContext } from 'react';

type SEOMetaTagsProps = {
  title: string;
  description: string;
  keywords: string[];
  noindex: boolean;
  nofollow: boolean;
  children?: React.ReactNode;
};

export const SEOMetaTags = (props: SEOMetaTagsProps) => {
  const { SEO } = useContext(EnvironmentContext);

  if (SEO) {
    return (
      <SEO
        title={props.title}
        description={props.description}
        keywords={props.keywords}
        noindex={props.noindex}
        nofollow={props.nofollow}
      >
        {props.children ?? null}
      </SEO>
    );
  }

  return null;
};
