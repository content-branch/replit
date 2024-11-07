import {
  Accordion,
  BodyCopy,
  Cards,
  CaseStudy,
  HeaderLarge,
  ImageCarousel,
  ImageTextList,
  Quote,
  Statistic,
  StatisticList,
  ImageText,
  PageKeyInformation,
  ImageStatistics,
  Map,
  Acquisition,
  AppFooter,
  Hero,
  Video,
  KeyFacts,
  ReferenceDescription,
  HeaderTextSmall,
  DownloadPdf,
  BrandLogosCarousel,
  BodyCopyComboList,
  Button,
  SEOMetaTags,
  Navigation,
  CtaWrapper
} from '@westfield-rise/westfield-rise-react-components';
import { ComponentMapper } from './component-mapper';
import Link from 'next/link';

type ComponentConfig = {
  component: React.ComponentType<any>;
  mapEntryToProps: (entry: any) => any;
};

export const componentMapping: Record<string, ComponentConfig> = {
  callToAction: {
    component: Button,
    mapEntryToProps: ComponentMapper.mapCallToAction,
  },
  ctaWrapper: {
    component: CtaWrapper,
    mapEntryToProps: ComponentMapper.mapCtaWrapper,
  },
  caseStudy: {
    component: CaseStudy,
    mapEntryToProps: ComponentMapper.mapCaseStudyProps,
  },
  headerLarge: {
    component: HeaderLarge,
    mapEntryToProps: ComponentMapper.mapHeaderLargeProps,
  },
  bodyCopy: {
    component: BodyCopy,
    mapEntryToProps: ComponentMapper.mapBodyCopy,
  },
  quote: {
    component: Quote,
    mapEntryToProps: ComponentMapper.mapQuote,
  },
  imageText: {
    component: ImageText,
    mapEntryToProps: ComponentMapper.mapImageText,
  },
  imageTextList: {
    component: ImageTextList,
    mapEntryToProps: ComponentMapper.mapImageTextList,
  },
  imageCarousel: {
    component: ImageCarousel,
    mapEntryToProps: ComponentMapper.mapImageCarousel,
  },
  accordion: {
    component: Accordion,
    mapEntryToProps: ComponentMapper.mapAccordion,
  },
  cards: {
    component: Cards,
    mapEntryToProps: ComponentMapper.mapCards,
  },
  kpiComponent: {
    component: Statistic,
    mapEntryToProps: ComponentMapper.mapKpiComponent,
  },
  statisticsList: {
    component: StatisticList,
    mapEntryToProps: ComponentMapper.mapStatisticsList,
  },
  pageKeyInformation: {
    component: PageKeyInformation,
    mapEntryToProps: ComponentMapper.mapPageKeyInformation,
  },
  imageStatistics: {
    component: ImageStatistics,
    mapEntryToProps: ComponentMapper.mapImageStatistics,
  },
  caseStudyCarousel: {
    component: ImageStatistics,
    mapEntryToProps: ComponentMapper.mapImageStatistics,
  },
  map: {
    component: Map,
    mapEntryToProps: ComponentMapper.mapMap,
  },
  acquisition: {
    component: Acquisition,
    mapEntryToProps: ComponentMapper.mapAcquisition,
  },
  footerMenu: {
    component: AppFooter,
    mapEntryToProps: ComponentMapper.mapFooterMenu,
  },
  homePageHero: {
    component: Hero,
    mapEntryToProps: ComponentMapper.mapHero,
  },
  vimeoComponent: {
    component: Video,
    mapEntryToProps: ComponentMapper.mapVimeoComponent,
  },
  keyFactList: {
    component: KeyFacts,
    mapEntryToProps: ComponentMapper.mapKeyFacts,
  },
  referenceDescription: {
    component: ReferenceDescription,
    mapEntryToProps: ComponentMapper.mapReferenceDescription,
  },
  headerSmall: {
    component: HeaderTextSmall,
    mapEntryToProps: ComponentMapper.mapHeaderSmall,
  },
  downloadPdf: {
    component: DownloadPdf,
    mapEntryToProps: ComponentMapper.mapDownloadPdf,
  },
  clientCarousel: {
    component: BrandLogosCarousel,
    mapEntryToProps: ComponentMapper.mapClientCarousel,
  },
  bodyCopyComboList: {
    component: BodyCopyComboList,
    mapEntryToProps: ComponentMapper.mapBodyCopyComboList,
  },
  navigationMenu: {
    component: Navigation,
    mapEntryToProps: ComponentMapper.mapNavigation,
  },
  seoMetaTags: {
    component: SEOMetaTags,
    mapEntryToProps: ComponentMapper.mapSEOMetaTags,
  }
  // Add other mappings here
};
