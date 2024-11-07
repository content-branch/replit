import { NextSeo } from 'next-seo';

export function SEOWrapper({
  title,
  description,
  keywords,
  noindex,
  nofollow,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}) {
  return (
    <NextSeo
      title={title}
      description={description}
      additionalMetaTags={
        keywords && [
          {
            name: 'keywords',
            content: keywords.join(', '),
          },
        ]
      }
      noindex={noindex}
      nofollow={nofollow}
    />
  );
}

export default SEOWrapper;
