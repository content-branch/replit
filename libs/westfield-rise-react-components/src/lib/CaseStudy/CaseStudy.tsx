import Accordion, { AccordionProps } from '../Accordion/Accordion';
import BodyCopy, { BodyCopyProps } from '../BodyCopy/BodyCopy';
import ImageCarousel, {
  ImageCarouselProps,
} from '../ImageCarousel/ImageCarousel';
import PageKeyInformation, {
  PageKeyInformationProps,
} from '../PageKeyInformation/PageKeyInformation';
import Quote, { QuoteProps } from '../Quote/Quote';
import StatisticList from '../StatisticList/StatisticList';
import { THEMES } from '../constants';
import styles from './CaseStudy.module.scss';
import { StatisticProps } from '../Statistic/Statistic';

/* eslint-disable-next-line */
export interface CaseStudyProps {
  theme?: THEMES;
  accordion?: AccordionProps;
  body?: BodyCopyProps;
  imageCarousel?: ImageCarouselProps;
  pageKeyInformation?: PageKeyInformationProps;
  quote?: QuoteProps;
  statisticsList?: StatisticProps[];
}

export function CaseStudy(props: CaseStudyProps) {
  const {
    theme,
    accordion,
    body,
    imageCarousel,
    pageKeyInformation,
    quote,
    statisticsList,
  } = props;
  return (
    <div className={styles['container']}>
      {pageKeyInformation && (
        <PageKeyInformation theme={theme} {...pageKeyInformation} />
      )}
      {statisticsList && (
        <StatisticList statisticsList={statisticsList} withAnimation={true} />
      )}
      {body && <BodyCopy {...body} />}
      {quote && <Quote {...quote} />}
      {imageCarousel && <ImageCarousel {...imageCarousel} />}
      {accordion && <Accordion theme={theme} {...accordion} />}
    </div>
  );
}

export default CaseStudy;
