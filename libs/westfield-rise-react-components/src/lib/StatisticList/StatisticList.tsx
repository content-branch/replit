import Statistic, { StatisticProps } from '../Statistic/Statistic';
import styles from './StatisticList.module.scss';

import classnames from 'classnames';

/* eslint-disable-next-line */
export interface StatisticListProps {
  title?: string;
  withAnimation?: boolean;
  statisticsList: StatisticProps[];
}

export function StatisticList(props: StatisticListProps) {
  const { title, statisticsList, withAnimation = true } = props;
  return (
    <div
      className={classnames(
        styles['container'],
        styles[`container--${withAnimation ? 'full' : 'half'}`],
      )}
    >
      {withAnimation && title && <h2 className={styles['title']}>{title}</h2>}
      {statisticsList?.map((statistic, index) => (
        <Statistic key={index} {...statistic} withAnimation={withAnimation} />
      ))}
    </div>
  );
}

export default StatisticList;
