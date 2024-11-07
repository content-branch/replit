import {
  CaseStudyProps,
  ConditionalHeaderLargeProps,
  BodyCopyProps,
  QuoteProps,
  ImageTextListProps,
  ImageCarouselProps,
  AccordionProps,
  CardsProps,
  StatisticListProps,
  StatisticProps,
  ImageTextProps,
  PageKeyInformationProps,
  ImageStatisticsProps,
  AppFooterProps,
  BrandLogosCarouselProps,
  KeyFactsProps,
  ReferenceDescriptionProps,
  DownloadPdfProps,
  HeaderTextSmallProps,
  MapProps,
  AcquisitionProps,
  HeroProps,
  VideoProps,
  BodyCopyComboListProps,
  NavigationProps,
  CtaWrapperProps
} from '@westfield-rise/westfield-rise-react-components';

import { DynamicComponent } from '../components/DynamicComponent';
import { contentTypeFromEntry } from '../utils/contentful';

const callToActionMapper = (data: any) => {
  let popupContent = undefined;
  if (data.isPopup === true && !!data.popupContent) {
    popupContent = DynamicComponent({
      entryId: data.popupContent.sys.id,
      contentType: contentTypeFromEntry(data.popupContent),
      locale: data.popupContent.sys.locale,
    });
  }
  return {
    label: data.buttonLabel,
    href: data.buttonLink,
    isExternal: data.isExternal,
    socialType: data.socialType,
    pdf: data.pdf && data.pdf.fields,
    isPopup: data.isPopup,
    popupContent,
    popupType: data.popupType,
  };
};

const accordionItemMapper = (data: any) => {
  return {
    header: data.fields.header,
    content: data.fields.content,
  };
};

const accordionMapper = (data: any) => {
  return {
    title: data.title,
    withNumber: data.withNumber,
    accordionItems:
      data.accordionItems && data.accordionItems.map(accordionItemMapper),
    indexOfOpened: data.indexOfOpened,
  };
};

const bodyCopyMapper = (data: any) => {
  return {
    title: data.title,
    bodyCopyText: data.bodyCopyText,
  };
};

const imageCarouselMapper = (data: any) => {
  const mappedImageCarouselItems = data.imageList?.map(
    (imageListItem: any) => ({
      src: imageListItem.fields.image.fields.file.url.startsWith('//')
        ? `https:${imageListItem.fields.image.fields.file.url}`
        : imageListItem.fields.image.fields.file.url,
      alt: imageListItem.fields.image.fields.title,
      textContainer: {
        textLeft: imageListItem.fields.textLeft,
        textRight: imageListItem.fields.textRight,
      },
      articleLink: imageListItem.fields.articleLink,
    }),
  );

  return {
    type: data.type,
    title: data.title,
    imageList: mappedImageCarouselItems,
    ctaProps: data.callToAction && callToActionMapper(data.callToAction.fields),
  };
};

const clientCarouselMapper = (data: any) => {
  const mappedImageList = data.logoList.map((image: any) => ({
    src: image.fields.file.url.startsWith('//')
      ? `https:${image.fields.file.url}`
      : image.fields.file.url,
    alt: image.fields.title,
  }));

  return {
    logoList: mappedImageList,
  };
};

const imageTextMapper = (data: any) => {
  return {
    type: data.type,
    title: data.title,
    name: data.title,
    role: data.role,
    subtitle: data.subtitle,
    text: data.text,
    image: {
      src: data.image.fields.file.url.startsWith('//')
        ? `https:${data.image.fields.file.url}`
        : data.image.fields.file.url,
      alt: data.image.title,
    },
    ctaProps: data.callToAction && callToActionMapper(data.callToAction.fields),
  };
};

const imageTextListMapper = (imageTextList: any) => {
  const mappedImageTextItems = imageTextList?.map((imageTextItem: any) => {
    const type = imageTextItem.fields.type;
    if (type === 'default')
      return {
        ...imageTextMapper(imageTextItem.fields),
        title: imageTextItem.fields.title,
      };
    else if (type === 'people')
      return {
        ...imageTextMapper(imageTextItem.fields),
        name: imageTextItem.fields.name,
        role: imageTextItem.fields.role,
      };
  });
  return mappedImageTextItems;
};

const cardMapper = (data: any) => {
  const type = data.fields.type;
  const commonProps = {
    type: data.fields.type,
    title: data.fields.title,
    image: {
      src: data.fields.image.fields.file.url.startsWith('//')
        ? `https:${data.fields.image.fields.file.url}`
        : data.fields.image.fields.file.url,
      alt: data.fields.image.fields.title,
    },
    slug: data.fields.slug,
  };
  if (type === 'case-study')
    return {
      ...commonProps,
      brandName: data.fields.brandName,
      text: data.fields.text,
      value: data.fields.value,
    };
  else if (type === 'insight')
    return {
      ...commonProps,
      text: data.fields.text,
    };

  // type === 'service'
  return {
    ...commonProps,
    text: data.fields.text,
    ctaProps:
      data.fields.callToAction &&
      callToActionMapper(data.fields.callToAction.fields),
  };
};

const keyFactsMapper = (data: any) => {
  const fields = data.keyFactList || data;
  const mappedKeyFacts = fields.map((keyFact: any) => ({
    key: keyFact.fields.key,
    fact: keyFact.fields.fact ?? keyFact.fields.fact2,
  }));

  return {
    keyFactList: mappedKeyFacts,
  };
};

const pageKeyInformationMapper = (data: any) => {
  return {
    brandName: data.brandName,
    title: data.title,
    text: data.text,
    infoList: data.infoList && keyFactsMapper(data.infoList).keyFactList,
    rowVariation: data.rowVariation,
    ctaProps: data.callToAction && callToActionMapper(data.callToAction.fields),
  };
};

const kpiMapper = (data: any) => {
  const fields = data.fields || data;

  return {
    value: fields.value,
    text: fields.text,
    referenceNumber: fields.referenceNumber,
    valuePrefix: fields.valuePrefix,
    valueSuffix: fields.valueSuffix,
  };
};

// This will be the mapping for the caseStudyList field from imageStatisticsMapper
const imageStatisticMapper = (data: any) => {
  const fields = data.fields || data;
  return {
    brandName: fields.brandName,
    image: {
      src: fields.image.fields.file.url.startsWith('//')
        ? `https:${fields.image.fields.file.url}`
        : fields.image.fields.file.url,
      alt: fields.image.fields.title,
    },
    statisticsList:
      fields.statisticsList && fields.statisticsList.map(kpiMapper),
    text: fields.text,
    ctaProps:
      fields.callToAction && callToActionMapper(fields.callToAction.fields),
  };
};

const imageStatisticsMapper = (data: any) => {
  return {
    title: data.title,
    caseStudyList:
      data.caseStudyList && data.caseStudyList[0]
        ? data.caseStudyList.map(imageStatisticMapper)
        : [imageStatisticMapper(data)],
  };
};

const referenceDescriptionMapper = (data: any) => {
  const mappedReferenceDescriptions = data.descriptionList.map(
    (entry: any) => ({
      referenceNumber: entry.fields.referenceNumber,
      text: entry.fields.text,
    }),
  );

  return {
    descriptionList: mappedReferenceDescriptions,
  };
};

const downloadPdfMapper = (data: any) => {
  return {
    text: data.text,
    ctaProps: callToActionMapper(data.callToAction.fields),
  };
};

const headerSmallMapper = (data: any) => {
  return {
    title: data.title,
    image: data.image && {
      src: data.image.fields.file.url.startsWith('//')
        ? `https:${data.image.fields.file.url}`
        : data.image.fields.file.url,
      alt: data.image.fields.title,
    },
  };
};

const footerMenuMapper = (data: any) => {
  const mappedLinkButtonList = data.linkButtonList?.map((button: any) =>
    callToActionMapper(button.fields),
  );
  const mappedSocialButtonList = data.socialButtonList?.map((button: any) =>
    callToActionMapper(button.fields),
  );

  return {
    logoText: data.logoText,
    mottoText: data.mottoText,
    copyRight: data.copyRight,
    linkButtonList: data.linkButtonList && mappedLinkButtonList,
    socialButtonList: data.SocialButtonList && mappedSocialButtonList,
    socialText: data.socialText,
  };
};

const locationsListMapper = (data: any) => {
  const fields = data.fields || data;
  return {
    locationName: fields.locationName,
    centerAddress: fields.centerAddress,
    href: fields.href,
  };
};

const areasListMapper = (data: any) => {
  const fields = data.fields || data;
  return {
    areaName: fields.areaName,
    locationsList: fields.locationsList.map(locationsListMapper),
  };
};

const coordMapper = (data: any) => { 
  const fields = data.fields || data 
  return {
    x: Number(fields.x),
    y: Number(fields.y),
    radius: Number(fields.radius),
    regionName: fields.regionName,
    index: Number(fields.index),
  }
}

const regionsListMapper = (data: any) => {
  const fields = data.fields || data;  
  return {
    name: fields.name,
    image: {
      src: fields.image.fields.file.url.startsWith('//')
        ? `https:${fields.image.fields.file.url}`
        : fields.image.fields.file.url,
      alt: fields.image.fields.title,
    },
    coordList: fields.mapCoordList.map(coordMapper) || [],
    imageTablet: {
      src: fields.imageTablet.fields.file.url.startsWith('//')
        ? `https:${fields.imageTablet.fields.file.url}`
        : fields.imageTablet.fields.file.url,
      alt: fields.imageTablet.fields.title,
    },
    imageMobile: {
      src: fields.imageMobile.fields.file.url.startsWith('//')
        ? `https:${fields.imageMobile.fields.file.url}`
        : fields.imageMobile.fields.file.url,
      alt: fields.imageMobile.fields.title,
    },
    areasList: fields.areasList.map(areasListMapper),
  };
};

const mapMapper = (data: any) => {  
  return {
    regionsList: data.regionsList.map(regionsListMapper),
    contactUsCta:
      data.contactUsCta && callToActionMapper(data.contactUsCta.fields),
    exploreBookCta:
      data.exploreBookCta && callToActionMapper(data.exploreBookCta.fields),
  };
};

const acquisitionMapper = (data: any) => {
  return {
    variant: data.variant,
    logo: {
      src: data.logo.fields.file.url.startsWith('//')
        ? `https:${data.logo.fields.file.url}`
        : data.logo.fields.file.url,
      alt: data.logo.fields.title,
    },
    title: data.title,
    text: data.text,
    author: data.author,
    jobTitle: data.jobTitle,
    contactUsCta:
      data.contactUsCta && callToActionMapper(data.contactUsCta.fields),
    exploreBookCta:
      data.exploreBookCta && callToActionMapper(data.exploreBookCta.fields),
  };
};

const heroMapper = (data: any) => {
  return {
    title: data.title,
    text: data.text,
    shortVideo: {
      url: data.shortVideo.fields.file.url,
    },
    thumbnailUrl: data.image?.fields?.file?.url?.startsWith('//')
      ? `https:${data?.image?.fields?.file?.url}`: data?.image?.fields?.file?.url,
    vimeoId: data.vimeoId,
    contactUsCta:
      data.contactUsCta && callToActionMapper(data.contactUsCta.fields),
    exploreBookCta:
      data.exploreBookCta && callToActionMapper(data.exploreBookCta.fields),
  };
};
const vimeoComponentMapper = (data: any) => {
  return {
    videoCode: data.vimeoId,
    image: data.image && {
      src: data.image.fields.file.url.startsWith('//')
        ? `https:${data.image.fields.file.url}`
        : data.image.fields.file.url,
      alt: data.image.fields.title,
    },
    fullWidth: data.fullWidth,
  };
};

const bodyCopyComboListMapper = (data: any) => {
  const mappedBodyCopyComboList = data.bodyCopyList.map(
    (bodyCopyCombo: any) => ({
      title: bodyCopyCombo.fields.title,
      text: bodyCopyMapper(bodyCopyCombo.fields.text.fields),
    }),
  );

  return {
    bodyCopyList: mappedBodyCopyComboList,
  };
};

const menuMapper = (data: any) => {
  return {
    type: data.fields.type,
    name: data.fields.name,
    items: data.fields.items && data.fields.items.map(menuMapper),
    ...callToActionMapper(data.fields),
  };
};

const navigationMapper = (data: any) => {
  return {
    logoNavBar: data.logoNavBar && {
      src: data.logoNavBar.fields.file.url.startsWith('//')
        ? `https:${data.logoNavBar.fields.file.url}`
        : data.logoNavBar.fields.file.url,
      alt: data.logoNavBar.fields.title,
    },
    logoSideMenu: data.logoSideMenu && {
      src: data.logoSideMenu.fields.file.url.startsWith('//')
        ? `https:${data.logoSideMenu.fields.file.url}`
        : data.logoSideMenu.fields.file.url,
      alt: data.logoSideMenu.fields.title,
    },
    menu: data.menu.map(menuMapper),
    featuredArticle1: cardMapper(data.featuredArticle1),
    featuredArticle2: cardMapper(data.featuredArticle2),
    loLive: cardMapper(data.loLive),
    featuredBrandExperience: cardMapper(data.featuredBrandExperience),
  };
};

export class ComponentMapper {
  static mapCaseStudyProps(entry: any): CaseStudyProps {
    return {
      accordion: entry.accordion && accordionMapper(entry.accordion.fields),
      body: entry.body && entry.body.fields,
      imageCarousel:
        entry.imageCarousel && imageCarouselMapper(entry.imageCarousel.fields),
      pageKeyInformation:
        entry.pageKeyInformation &&
        pageKeyInformationMapper(entry.pageKeyInformation.fields),
      quote: entry.quote && entry.quote.fields,
      statisticsList:
        entry.statisticsList &&
        entry.statisticsList.fields.statisticsList.map(kpiMapper),
    };
  }

  static mapHeaderLargeProps(data: any): ConditionalHeaderLargeProps {
    const type = data.type;

    // Depending on the data in the entry, determine which kind of header it is
    if (type === 'text') {
      const link =
        data.content?.fields.showCallToAction &&
          data.content.fields.callToAction
          ? callToActionMapper(data.content.fields.callToAction.fields)
          : undefined as any;

      return {
        type: 'text',
        title: data.content?.fields.title,
        text: data.content?.fields.text,
        link,
      };
    } else if (type === 'image') {
      return {
        type: 'image',
        image: data.image && {
          src: data.image.fields.file.url.startsWith('//')
            ? `https:${data.image.fields.file.url}`
            : data.image.fields.file.url,
          alt: data.image.fields.title,
        },
      };
    } else if (type === 'video') {
      return {
        type: 'video',
        image: data.content.fields.image && {
          src: data.content.fields.image.fields.file.url.startsWith('//')
            ? `https:${data.content.fields.image.fields.file.url}`
            : data.content.fields.image.fields.file.url,
          alt: data.content.fields.image.fields.title,
        },
        videoCode: data.content.fields.vimeoId,
        fullWidth: data.content.fields.fullWidth,
      };
    }

    // If entry doesn't match any known type, throw an error or handle gracefully.
    throw new Error('Unknown HeaderLarge entry type.');
  }

  static mapBodyCopy(fields: any): BodyCopyProps {
    return {
      ...bodyCopyMapper(fields),
    };
  }

  static mapQuote(fields: any): QuoteProps {
    return {
      quote: fields.quote,
      author: fields.author,
      jobTitle: fields.jobTitle,
    };
  }

  static mapImageText(data: any): ImageTextProps {
    return {
      ...imageTextMapper(data),
    };
  }

  static mapImageTextList(data: any): ImageTextListProps {
    return {
      title: data.title,
      imageTextList: imageTextListMapper(data.imageTextList),
    };
  }

  static mapImageCarousel(data: any): ImageCarouselProps {
    return {
      ...imageCarouselMapper(data),
    };
  }

  static mapCtaWrapper(data: any): CtaWrapperProps {   
    return {
      name: data.name,
      ctas: data.cta.map((cta: any) => callToActionMapper(cta.fields)),
      prefix: data.prefix,
    }
  }

  static mapAccordion(data: any): AccordionProps {
    return {
      ...accordionMapper(data),
    };
  }

  static mapCards(data: any): CardsProps {
    return {
      title: data.title,
      withMotionBackground: data.withMotionBackground,
      cardList: data.cardList.map(cardMapper),
    };
  }

  static mapKpiComponent(data: any): StatisticProps {
    return {
      ...kpiMapper(data),
    };
  }

  static mapStatisticsList(data: any): StatisticListProps {
    return {
      title: data.title,
      withAnimation: data.withAnimation,
      statisticsList: data.statisticsList.map(kpiMapper),
    };
  }

  static mapPageKeyInformation(data: any): PageKeyInformationProps {
    return {
      ...pageKeyInformationMapper(data),
    };
  }

  static mapImageStatistics(data: any): ImageStatisticsProps {
    return {
      ...imageStatisticsMapper(data),
    };
  }

  static mapFooterMenu(data: any): AppFooterProps {
    return {
      ...footerMenuMapper(data),
    };
  }

  static mapKeyFacts(data: any): KeyFactsProps {
    return {
      ...keyFactsMapper(data),
    };
  }

  static mapClientCarousel(data: any): BrandLogosCarouselProps {
    return {
      ...clientCarouselMapper(data),
    };
  }

  static mapReferenceDescription(data: any): ReferenceDescriptionProps {
    return {
      ...referenceDescriptionMapper(data),
    };
  }

  static mapDownloadPdf(data: any): DownloadPdfProps {
    return {
      ...downloadPdfMapper(data),
    };
  }

  static mapHeaderSmall(data: any): HeaderTextSmallProps {
    return {
      ...headerSmallMapper(data),
    };
  }

  static mapMap(data: any): MapProps {    
    return {
      ...mapMapper(data),
    };
  }

  static mapAcquisition(data: any): AcquisitionProps {
    return {
      ...acquisitionMapper(data),
    };
  }

  static mapHero(data: any): HeroProps {
    return {
      ...heroMapper(data),
    };
  }

  static mapVimeoComponent(data: any): VideoProps {
    return {
      ...vimeoComponentMapper(data),
    };
  }

  static mapBodyCopyComboList(data: any): BodyCopyComboListProps {
    return {
      ...bodyCopyComboListMapper(data),
    };
  }

  static mapCallToAction(data: any) {
    return {
      ...callToActionMapper(data),
    };
  }

  static mapSEOMetaTags(data: any) {
    return {
      title: data?.seoTitle,
      description: data?.description,
      keywords: data?.keywords,
      noindex: data?.hidePageFromSearchEnginesNoindex,
      nofollow: data?.excludeLinksFromSearchRankingsNofollow,
    };
  }
  static mapNavigation(data: any): NavigationProps {
    return {
      ...navigationMapper(data),
    };
  }

  // Add more static methods for other components as needed.
}
