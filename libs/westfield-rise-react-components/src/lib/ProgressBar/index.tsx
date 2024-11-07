import styles from './styles.module.scss';
import classNames from 'classnames';
import React, { useMemo } from 'react';

type ProgressBarProps = {
  currentStep: number;
  steps: string[];
};

const ProgressBarBullet = ({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(
        styles.progress_bar__bar__step_bullet,
        active ? styles.progress_bar__bar__step_bullet__active : '',
      )}
    >
      {children}
    </div>
  );
};
export const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  const gapValue = useMemo(() => {
    return 1 / (steps.length + 1);
  }, [steps]);

  const progressLeft = useMemo(() => {
    const limitedStep = currentStep;
    if (currentStep >= steps.length + 1) {
      return `100%`;
    }
    if (currentStep <= 0) {
      return `0%`;
    }

    return `calc( ${limitedStep * gapValue * 100}% + ${
      (limitedStep - 1) * 10
    }px)`;
  }, [currentStep, gapValue, steps]);

  return (
    <div className={styles.progress_bar__wrapper}>
      <div
        className={styles.progress_bar__bar}
        style={{ gap: `calc( ${gapValue * 100}% )` }}
      >
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          return (
            <ProgressBarBullet active={isActive} key={`${index + 1}-${step}`}>
              <div
                className={classNames(
                  styles.progress_bar__bar__step_bullet__text,
                  isActive
                    ? styles.progress_bar__bar__step_bullet__text__active
                    : '',
                )}
              >
                {step}
              </div>
            </ProgressBarBullet>
          );
        })}
        <div
          className={styles.progress_bar__bar__progress}
          style={{
            width: progressLeft,
          }}
        />
      </div>
    </div>
  );
};

ProgressBar.defaultProps = {
  currentStep: 1,
};
