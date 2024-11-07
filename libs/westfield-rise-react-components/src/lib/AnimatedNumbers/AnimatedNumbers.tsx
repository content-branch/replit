import React, { useEffect, useState, useRef, CSSProperties, useReducer } from "react";
import { Spring, animated, SpringConfig } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

type configsFn = ({numberValue, index}: {numberValue: number, index: number}) => SpringConfig;

// Define types or interfaces for your props
interface AnimatedNumberProps {
  animateToNumber: number;
  fontStyle?: CSSProperties;
  configs: SpringConfig[] | configsFn; // Replace 'unknown' with the actual type expected in 'configs'.
  includeComma: boolean;
}

const NUMBERS: number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9,
];

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debounce<F extends (...params: any[]) => void>(fn: F, delay: number): (...params: Parameters<F>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<F>) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  animateToNumber,
  fontStyle,
  configs,
  includeComma,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const keyCount = useRef(0);
  const animateToNumberString = includeComma
    ? Math.abs(animateToNumber).toLocaleString("en-US")
    : String(Math.abs(animateToNumber));
  const animateToNumbersArr = Array.from(animateToNumberString, Number).map(
    (x, idx) => (isNaN(x) ? animateToNumberString[idx] : x)
  );

  const [numberHeight, setNumberHeight] = useState(0);
  const numberDivRef = useRef<HTMLDivElement>(null);

  const setConfig = (
    configs:  SpringConfig[] | configsFn,
    number: number,
    index: number
  ): SpringConfig => {
    if (typeof configs === "function") {
      return configs({numberValue:number, index});
    }
    return configs[getRandomIntInclusive(0, configs.length - 1)];
  };

  useEffect(() => {
    const height = numberDivRef.current?.getClientRects()?.[0]?.height;
    if (height) {
      setNumberHeight(height);
    }
  }, [animateToNumber, fontStyle]);

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // Debounce resize listener
  const handleResize = debounce(() => {

    console.log(`window size: ${window.innerHeight} && ${window.innerWidth}`)
    const height = numberDivRef.current?.getClientRects()?.[0]?.height;
    if (height) {
      setNumberHeight(height);
    }
  }, 250); // 250ms delay

  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <>
      {numberHeight !== 0 && (
        <div
          ref={ref}
          style={{ display: "flex", flexDirection: "row" }}
          className="animated-container"
        >
          {inView && animateToNumber < 0 && <div style={fontStyle}>-</div>}
          {inView &&
            animateToNumbersArr.map((n, index) => {
              if (typeof n === "string") {
                return (
                  <div key={index} style={{ ...fontStyle }}>
                    {n}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  style={{
                    height: numberHeight,
                    overflow: "hidden",
                  }}
                >
                  <Spring
                    key={`${keyCount.current++}`}
                    from={{
                      transform: "translateY(0px)",
                    }}
                    to={{
                      transform: `translateY(${
                        -1 * (numberHeight * (animateToNumbersArr[index] as number)) -
                        numberHeight * 20
                      })`,
                    }}
                    config={setConfig(configs, n, index)}
                  >
                    {(props) =>
                    <>
                     { NUMBERS.map((number, i) => (
                        <animated.div
                          key={i}
                          style={{ ...fontStyle, ...props }}
                        >
                          {number}
                        </animated.div>
                      ))}
                      </>
                    }
                  </Spring>
                </div>
              );
            })}
        </div>
      )}

      <div
        ref={numberDivRef}
        style={{ position: "absolute", top: -9999, ...fontStyle }}
      >
        {0}
      </div>
    </>
  );
};

const Enhanced = React.memo(AnimatedNumber, (prevProps, nextProps) => {
  return (
    prevProps.animateToNumber === nextProps.animateToNumber &&
    prevProps.fontStyle === nextProps.fontStyle &&
    prevProps.includeComma === nextProps.includeComma
  );
});

export default Enhanced;
