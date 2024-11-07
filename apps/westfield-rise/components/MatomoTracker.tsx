import React, { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';
import { fallbackLocale } from '@westfield-rise/westfield-rise-contentful-client';
import { api } from '../utils/api';
import { mapMatomoConfig } from '../utils/constants';

import styles from './FilterableSortableList.module.scss';

export interface MatomoConfig {
  destination: string;
  pushData: Array<{ command: string; value?: string; isInsideIIFE?: boolean }>;
  cdnUrl: string;
  matomoTrackerOptOutUrl: string;
}

declare global {
  interface Window {
    _paq: any[];
  }
}

const generatePaqScript = (matomoConfig: MatomoConfig) => {
  const outsideIIFE: any[] = [];
  const insideIIFE: any[] = [];

  matomoConfig.pushData.forEach(item => {
    const command = item.value
      ? `['${item.command}', '${item.value.replace(
        '{u}',
        matomoConfig.destination,
      )}']`
      : `['${item.command}']`;

    if (item.isInsideIIFE) {
      insideIIFE.push(`_paq.push(${command});`);
    } else {
      outsideIIFE.push(`_paq.push(${command});`);
    }
  });

  return `
      if (typeof window !== 'undefined') {
        var _paq = window._paq = window._paq || [];
        ${outsideIIFE.join(' ')}

      (function() {
        var u="${matomoConfig.destination}";
        ${insideIIFE.join(' ')}
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src='${matomoConfig.cdnUrl
    }'; s.parentNode.insertBefore(g,s);
      })();
    }
    `;
};

export const MatomoTracker = () => {
  const { data: matomoConfig } = api.pages.globalSettings.useQuery(
    {
      key: 'matomo-tracker-settings',
      locale: fallbackLocale,
    },
    {
      select: data => mapMatomoConfig(data),
    },
  );

  const [matomoTracking, setMatomoTracking] = useState(true);
  const [hideBanner, setHideBanner] = useState<boolean>(false);

  const checkInitialization = useCallback(() => {
    if (window !== undefined) {
      if (localStorage.getItem("matomoTraking")) {
        const isOptedOut = localStorage.getItem('matomoTraking') === 'false';
        setMatomoTracking(!isOptedOut);
        setHideBanner(true);
      } else {
        setHideBanner(false);
      }
    } else {
      setTimeout(checkInitialization, 100);
    }
  }, []);

  useEffect(() => {
    checkInitialization();
  }, [matomoTracking, hideBanner, checkInitialization]);

  const handleAccept = () => {
    localStorage.setItem('matomoTraking', 'true');
    window._paq.push(['forgetUserOptOut']);
    setHideBanner(true);
  };

  const handleDecline = () => {
    localStorage.setItem('matomoTraking', 'false');
    window._paq.push(['optUserOut']);
    setHideBanner(true);
  };

  return (
    <>
      {matomoConfig ? (
        <>
          <div id="matomo-opt-out" hidden></div>
          {!hideBanner && (
            <div id="optout-form" className={styles['matomo_container']}>
              We use essential cookies to make our site work. With your consent,
              we may also use non-essential cookies to improve user experience
              and analyse website traffic. By clicking &quot;Accept&quot;, you
              agree to our website&apos; cookie use as described in our Cookie
              Policy.
              <div className={styles['button_container']}>
                <button className={styles['button']} onClick={handleAccept}>
                  Accept
                </button>
                <button className={styles['button']} onClick={handleDecline}>
                  Decline
                </button>
              </div>
            </div>
          )}
          <Script
            id="matomo-tracker-opt-out"
            strategy="afterInteractive"
            src={matomoConfig.matomoTrackerOptOutUrl}
          />
          <Script
            id="matomo-tracker"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
       ${generatePaqScript(matomoConfig)}
     `,
            }}
          />
        </>
      ) : (
        ''
      )}
    </>
  );
};
