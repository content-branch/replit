export const filterableSortableListContentType = 'filterableSortableList';

// TODO: find a permanent solution for src and alt
const callToActionMapper = (data: any) => {
  return {
    label: data?.buttonLabel,
    href: data?.buttonLink,
  };
};

const mapCommonData = (data: any) => {
  if (data) {
    return {
      image: {
        src:
          data.image.fields.file.url ??
          'images.ctfassets.net/tvi9upeknft2/7GhIpLT9VRZJG8N8BDHTxE/457094667f6cd48ce88f23327d5c9e48/logo-nav-bar.png',
        alt: data.image.fields.title ?? 'logo-nav-bar',
      },
      slug: data.slug,
      text: data.text,
      title: data.title,
      longTitle: data.longTitle,
      type: data.type,
    };
  }
};

const mapMenu = (data: any) => {
  if (data) {
    return {
      type: data.fields?.type,
      name: data.fields?.name,
      items: data.fields?.items?.map(mapMenu),
      ...callToActionMapper(data.fields),
    };
  }
};

export const mapHeaderData = (headerMenuData: any) => {
  const fields = headerMenuData?.fields;

  return {
    featuredArticle1: mapCommonData(fields?.featuredArticle1?.fields),
    featuredArticle2: mapCommonData(fields?.featuredArticle2?.fields),
    loLive: mapCommonData(fields?.loLive?.fields),
    featuredBrandExperience: mapCommonData(fields?.featuredBrandExperience?.fields),
    logoNavBar: {
      src:
        fields?.logoNavBar.fields.file.url ??
        'images.ctfassets.net/tvi9upeknft2/7GhIpLT9VRZJG8N8BDHTxE/457094667f6cd48ce88f23327d5c9e48/logo-nav-bar.png',
      alt: fields?.logoNavBar.fields.title ?? 'logo-nav-bar',
    },
    logoSideMenu: {
      src:
        fields?.logoSideMenu.fields.file.url ??
        'images.ctfassets.net/tvi9upeknft2/7GhIpLT9VRZJG8N8BDHTxE/457094667f6cd48ce88f23327d5c9e48/logo-nav-bar.png',
      alt: fields?.logoSideMenu.fields.title ?? 'logo-nav-bar',
    },
    menu: fields?.menu.map(mapMenu),
  };
};

export const mapFooterData = (footerMenuData: any) => {
  const fields = footerMenuData?.fields;

  const linkButtonList = fields?.linkButtonList.map((button: any) => ({
    label: button.fields.buttonLabel,
    href: button.fields.buttonLink,
    isExternal: button.fields.isExternal,
    isOneTrust: button.fields.isOneTrust,
  }));

  const socialButtonList = fields?.socialButtonList.map((button: any) => ({
    label: button.fields.buttonLabel,
    href: button.fields.buttonLink,
    isExternal: button.fields.isExternal,
    socialType: button.fields.socialType,
    isPopup: button.fields.isPopup,
  }));

  return {
    copyRight: fields?.copyRight,
    logoText: fields?.logoText,
    mottoText: fields?.mottoText,
    linkButtonList,
    socialButtonList,
    socialText: fields?.socialText,
  };
};

function getDefaultMatomoConfig() {
  return {
    destination: 'https://westfieldrise.matomo.cloud/',
    pushData: [
      {
        command: 'trackPageView',
      },
      {
        command: 'enableLinkTracking',
      },
      {
        command: 'setTrackerUrl',
        value: '{u}matomo.php',
      },
      {
        command: 'setSiteId',
        value: '2',
      },
    ],
    cdnUrl: '//cdn.matomo.cloud/westfieldrise.matomo.cloud/matomo.js',
  };
}

export const mapMatomoConfig = (matomoConfigValue: any) => {
  const matomoConfig = JSON.parse(matomoConfigValue) ?? null;

  if (matomoConfig) {
    return matomoConfig;
  }

  return getDefaultMatomoConfig();
};
