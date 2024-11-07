import LogoLarge from '../assets/img/logo-large-footer.png';
import CorporateLogo from '../assets/img/WCorporate Logo.png';

import styles from './AppFooter.module.scss';
import { socialIconMap } from './constants';
import Button from '../Button/Button';
import { CustomImage } from '../CustomImage/CustomImage';

interface ctaProps {
  label: string;
  href: string;
  isExternal?: boolean;
  isOneTrust?: boolean;
  socialType?: 'linkedIn';
}

export interface AppFooterProps {
  logoText: string;
  mottoText: string;
  copyRight: string;
  linkButtonList?: ctaProps[];
  socialButtonList?: ctaProps[];
  linkList?: { href: string; title: string }[];
  prefix?: string;
  socialText: string;
}

export function AppFooter(props: AppFooterProps) {
  const {
    logoText,
    mottoText,
    copyRight,
    linkButtonList,
    socialButtonList,
    prefix,
    socialText,
  } = props;

  const clickCookiesSettings = () => {
    const elem = document.getElementById('ot-sdk-btn');
    elem?.click()
  }

  return (
    <footer>
      <div className={styles['container']}>
        <div className={styles['info']}>
          <div className={styles['info--left']}>
            <CustomImage
              src={LogoLarge}
              alt="Logo"
              width={412.5}
              height={178}
              className={styles['logo']}
            />
            <div className={styles['logo-text']}>{logoText}</div>
          </div>
          <div className={styles['info--right']}>
            <div className={styles['motto']}>
              <CustomImage
                src={CorporateLogo}
                width={270}
                height={68}
                className={styles['motto__logo']}
                alt="Corporate logo Unibail"
              />
              <div className={styles['motto-text']}>{mottoText}</div>
            </div>
            <div className={styles['follow-us']}>
              <span>{socialText}</span>
              {socialButtonList &&
                socialButtonList.map((button, index) => (
                  <Button
                    key={index}
                    variant="icon"
                    href={button.href}
                    icon={button.socialType && socialIconMap[button.socialType]}
                    isExternal={button.isExternal}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={styles['legal']}>
          <div className={styles['copyright']}>{copyRight}</div>
          {linkButtonList && (
            <div className={styles['links']}>
              {linkButtonList?.map((link, index) => {
                if (link.isOneTrust ) {
                  return (
                    <>
                      <button className='Button_link__P6gCw' onClick={()=> clickCookiesSettings()}>{link.label}</button>
                      <div style={{display: 'none'}}>
                        <button id="ot-sdk-btn" className="ot-sdk-show-settings" >Paramétrer</button>
                      </ div>
                    </>
                  )
                } else {
                  return <Button
                    key={index}
                    variant="link"
                    label={link.label}
                    href={link.href}
                    isExternal={link.isExternal}
                    prefix={prefix}
                  />
                }
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
