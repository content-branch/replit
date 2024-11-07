import {
  formatter,
  trauncateFractionAndFormat,
} from '../helpers/numberFormatter';
import styles from './Statistic.module.scss';

import dynamic from 'next/dynamic';

import classnames from 'classnames';
import { useEffect, useReducer, useRef, useState } from 'react';


const AnimatedNumbers = dynamic(() => import('../AnimatedNumbers/AnimatedNumbers'), {
  ssr: false,
});



/* eslint-disable-next-line */ 
export interface StatisticProps {
  text: string;
  referenceNumber?: number;
  valuePrefix?: string;
  value: number;
  valueSuffix?: string;
  withAnimation?: boolean;
}

interface WindowDimensions {
  height: number | undefined;
  width: number | undefined;
}

export function Statistic(props: StatisticProps) {
  const {
    text,
    referenceNumber,
    valuePrefix,
    value,
    valueSuffix,
    withAnimation,
  } = props;

  const trunctedFormattedNumber = trauncateFractionAndFormat(
    formatter.formatToParts(value),
    2,
  );


  return (
    <div className={classnames(styles['container'], 'statistic-container')}>
      <span className={styles['text']}>
        {text}
        {referenceNumber && <sup>{referenceNumber}</sup>}
      </span>
      <div
        className={classnames(styles['value-container'], valueSuffix && valueSuffix?.length > 2 ? styles['long-suffix'] : '')}>

        <span>{valuePrefix}</span>
        {withAnimation ? (
          <AnimatedNumbers
            includeComma
            animateToNumber={value}
            configs={[
              { mass: 1, tension: 220, friction: 100 },
              { mass: 2, tension: 230, friction: 100 },
              { mass: 3, tension: 220, friction: 100 },
            ]}
          ></AnimatedNumbers>
        ) : (
          <span>
            {trunctedFormattedNumber}
          </span>
        )}
        <span>
          {valueSuffix}
        </span>
      </div>
    </div>
  );
}

export default Statistic;
