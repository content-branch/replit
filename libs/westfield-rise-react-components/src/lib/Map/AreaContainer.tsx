import { createRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import {
  Accordion as AccordionWrapper,
  AccordionItem as Item,
} from '@szhsin/react-accordion';
import { AreaProps, LocationProps, MapRegionProps } from './Map'

import { ReactComponent as IconChevronDown } from '../assets/svg/icon-chevron-down-btn.svg';
import { ReactComponent as IconExternalArrow } from '../assets/svg/icon-external-arrow.svg';

import '../styles/accordionStyles.scss';
import styles from './Map.module.scss';

interface LocationContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  locationsList: AreaProps['locationsList']
}

export const AccordionItem = (props: { areaName: string, count: number, index: number, children: React.ReactNode; }) => {
  const { areaName, count, index, ...rest } = props;

  return (
    <Item
      {...rest}
      header={
        <>
          <div className={`${styles['accordion-wrapper__list__name']}`}>
            <span>{areaName}</span>
            <span>({count})</span>
          </div>
          <IconChevronDown className="chevron-down" />
        </>
      }
      initialEntered={index === 0 ? true : false}
    />
  );
};

const LocationContainer = (props: LocationContainerProps) => {
  const { locationsList, ...rest } = props;

  return (
    <div className={styles['location-container__list']} {...rest}>
      {locationsList && locationsList.map((locationsListItem, index) => (
        <div key={index} className={styles['location-container__list__item']}>
          <a href={locationsListItem.href} rel="noreferrer" target="_blank">
            <div>
              <span className={styles['location-container__list__item__name']}>{locationsListItem.locationName}</span>
              <span className={styles['location-container__list__item__center']}>{locationsListItem.centerAddress}</span>
            </div>
            <IconExternalArrow className={styles.icon} />
          </a>
        </div>
      ))}
    </div>
  )
}

export function AreaContainer(props: { areasList: MapRegionProps['areasList'] }) {
  const { areasList } = props;
  const [activeLocation, setactiveLocation] = useState<LocationProps[]>(areasList[0].locationsList);
  const [activeIndex, setActiveIndex] = useState(0);
  const myRefs = useRef(Array.from({ length: areasList.length }, _a => createRef<HTMLInputElement>()));
  const [height, setHeight] = useState(0);
  const [hasMounted, setHasMounted] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setHasMounted(true)
  }, []);

  useEffect(() => {
    setactiveLocation(areasList[0].locationsList);
    setActiveIndex(0);
    myRefs.current = areasList.map((_element, i) => myRefs.current[i] ?? createRef());
    setHeight(0);
    if (myRefs.current[0].current) {
      const firstRef = myRefs.current[0].current.clientHeight;
      myRefs.current.map(myRef => setHeight(currentHeight => currentHeight + (myRef.current?.clientHeight ?? firstRef)));
    }
  }, [areasList, height, hasMounted, isMobile])

  return (
    <div className={styles['area-container']}>
      {hasMounted && isMobile ? (
        <AccordionWrapper
          className={'map_accordion_wrapper'}
          transition
          transitionTimeout={250}
        >
          {areasList?.map((areasListItem, i) => (
            <AccordionItem
              areaName={areasListItem.areaName}
              count={areasListItem.locationsList.length}
              key={i}
              index={i}
            >
              <LocationContainer locationsList={areasListItem.locationsList} />
            </AccordionItem>
          ))}
        </AccordionWrapper>
      ) : (
        <>
          <div className={styles['area-container__list']}>
            {areasList.map((areasListItem, index) => (
              <div
                key={index}
                className={`${index === activeIndex ? `${styles['active']}` : `${styles['inactive']}`} ${styles['area-container__list__name']}`}
                style={{ padding: 30 }}
                ref={myRefs.current[index]}
                onClick={() => { setactiveLocation(areasListItem.locationsList); setActiveIndex(index) }}
              >
                <span>{areasListItem.areaName}</span>
                <span>({areasListItem.locationsList.length})</span>
              </div>
            ))}
          </div>
          <LocationContainer locationsList={activeLocation} style={{ height: height }} />
        </>
      )}

    </div>
  )
}

export default AreaContainer