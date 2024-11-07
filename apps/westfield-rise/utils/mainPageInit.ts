import { getHelpers } from './serverSideHelpers';

type MainPageInitProps = {
  context: any;
  menuType: 'header' | 'footer';
  menuSlug: string;
};

export const getAndPrefetchMenu = async ({
  context,
  menuType,
  menuSlug
}: MainPageInitProps): Promise<string> => {
  const helpers = getHelpers(context);

  const contentType = menuType === 'header' ? 'navigationMenu' : 'footerMenu';

  await helpers.pages.componentBySlug.prefetch({
    slug: menuSlug,
    contentType,
  });

  return menuSlug;
};
