import { useContext } from 'react';
import ConditionalLinkWrapper from '../contexts/ConditionalLinkWrapper';
import { EnvironmentContext } from '../contexts/EnvironmentContext';
import { RightArrow } from '../Icons/RightArrow';

import classnames from 'classnames';

import styles from './ListCard.module.scss';
import { CustomImage } from '../CustomImage/CustomImage';

type CaseStudyCardProps = {
  type: 'case-study';
  brandName?: string;
  value?: string;
  title: string;
  longTitle?: string;
  text?: string;
  image: {
    src: string;
    alt: string;
  };
  slug?: string;
  prefix?: string;
  ctaProps?: {
    href: string;
    label: string;
  };
};

type InsightCardProps = {
  type: 'insight';
  title: string;
  longTitle?: string;
  image: {
    src: string;
    alt: string;
  };
  text: string;
  slug?: string;
  prefix?: string;
};

type ServiceCardProps = {
  type: 'service';
  title: string;
  longTitle?: string;
  text?: string;
  ctaProps?: {
    href: string;
    label: string;
  };
  image: {
    src: string;
    alt: string;
  };
  slug?: string;
  prefix?: string;
};

const CaseStudyCard = (props: CaseStudyCardProps) => {
  const { type, brandName, value, title, text, image, slug, prefix } = props;

  return (
    <ConditionalLinkWrapper
      href={slug || ''}
      isExternal={false}
      prefix={prefix}
    >
      <div className={classnames(styles['container'], styles[`container--${type}`])}>
        <div className={styles['image_container']}>
          <CustomImage className={styles['image']} src={image.src} alt={image.alt || ''}
            width={510}
            height={480}
          />
          <div className={styles['brand_wrapper']}>
            <span className={styles['brand']}>{brandName}</span>
          </div>
        </div>
        <div className={styles['content']}>
          <div className={styles['value_container']}>
            <div className={styles['value']}>{value}</div>
            <div className={styles['title']}>{title}</div>
          </div>
          <div className={styles['text']}>{text}</div>
        </div>
      </div>
    </ConditionalLinkWrapper>
  );
};

const InsightCard = (props: InsightCardProps) => {
  const { type, title, image, slug, prefix, text } = props;

  return (
    <ConditionalLinkWrapper
      href={slug || ''}
      isExternal={false}
      prefix={prefix}
    >
      <div className={classnames(styles['container'], styles[`container--${type}`])}>
        <div className={styles['image_container']}>
          <CustomImage className={styles['image']} src={image.src} alt={image.alt || ''}
            width={480}
            height={480}
          />
        </div>
        <div className={styles['title']}>{title}</div>
        <div className={styles['text']}>{text}</div>
      </div>
    </ConditionalLinkWrapper>
  );
};

const ServiceCard = (props: ServiceCardProps) => {
  const { type, title, text, ctaProps, image, slug, prefix } = props;
  const { Link } = useContext(EnvironmentContext);

  return (
    <div className={classnames(styles['container'], styles[`container--${type}`])}>
      <div className={styles['image_container']}>
        <CustomImage className={styles['image']} src={image.src} alt={image.alt || ''}
          width={480}
          height={321}
        />
      </div>
      <div className={styles['content']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['text']}>{text}</div>
        {(ctaProps || slug) && (
          <Link prefetch={false} href={ctaProps?.href || slug || ''} className={styles['link']} prefix={prefix}>
            {ctaProps?.label || 'Read more'}
            <RightArrow />
          </Link>
        )}
      </div>
    </div>
  );
};

export type ConditionalListCardProps =
  | CaseStudyCardProps
  | InsightCardProps
  | ServiceCardProps;

const ListCardFactory = (props: ConditionalListCardProps) => {
  const { type } = props;

  switch (type) {
    case 'case-study':
      return (
        <CaseStudyCard
          type={type}
          brandName={props.brandName}
          value={props.value}
          title={props.title}
          text={props.text}
          image={props.image}
          slug={props.ctaProps?.href}
          prefix={props.prefix}
        />
      );
    case 'insight':
      return (
        <InsightCard
          type={type}
          image={props.image}
          title={props.title}
          text={props.text}
          slug={props.slug}
          prefix={props.prefix ? `${props.prefix}/news-and-insight` : 'news-and-insight'}
        />
      );
    case 'service':
    default:
      return (
        <ServiceCard
          type={type}
          image={props.image}
          title={props.title}
          text={props.text}
          ctaProps={props.ctaProps}
          slug={props.slug}
          prefix={props.prefix}
        />
      );
  }
}

export function ListCard(props: ConditionalListCardProps) {
  return (
    <ListCardFactory {...props} />
  )
}

export default ListCard;
