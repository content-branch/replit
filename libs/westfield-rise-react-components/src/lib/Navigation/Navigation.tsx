import { useContext, useState, Dispatch, useEffect, memo, useCallback, use, useMemo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

import { EnvironmentContext } from '../contexts/EnvironmentContext';
import Button, { ButtonProps } from '../Button/Button';
import { ConditionalListCardProps } from '../ListCard/ListCard';
import LanguageSelector from './LanguageSelector';
import FeaturedArticles from './FeaturedArticles';

import { ReactComponent as IconBurgerNav } from '../assets/svg/icon-burger-nav.svg';
import { ReactComponent as IconBack } from '../assets/svg/icon-chevron-right-btn.svg';
import { ReactComponent as IconClose } from '../assets/svg/icon-close.svg';
import { ReactComponent as IconChevronRight } from '../assets/svg/icon-chevron-right-btn.svg';

import classnames from 'classnames';

import 'swiper/css';
import styles from './Navigation.module.scss';
import { CustomImage } from '../CustomImage/CustomImage';
import { useRouter } from 'next/router';

export type definedLocaleProps = {
  code: string,
  name: string,
  default: boolean,
  fallbackCode: string,
  sys: {
    id: string,
    type: string,
    version: number
  }
}

type MenuProps = {
  name?: string;
  type?: string;
  items?: MenuProps[];
  href?: string;
  label?: string;
}

/* eslint-disable-next-line */
export interface NavigationProps {
  logoNavBar: {
    src: string,
    alt: string,
  };
  logoSideMenu: {
    src: string,
    alt: string,
  };
  menu: MenuProps[];
  featuredArticle1: ConditionalListCardProps;
  featuredArticle2: ConditionalListCardProps;
  loLive: ConditionalListCardProps;
  featuredBrandExperience: ConditionalListCardProps;
  definedLocales?: definedLocaleProps[];
  locale?: string;
  prefix?: string;
}

type SubNavItemsProps = {
  subNavItems: ButtonProps[];
  handleClose: any;
  prefix?: string;
}

const SubNavItemsContainer = (props: SubNavItemsProps) => {
  const { subNavItems, handleClose, prefix } = props;
  const { Link } = useContext(EnvironmentContext);

  return (
    <ul className={classnames(styles['links-container__list'], styles['links-container__list--nested'])}>
      {subNavItems?.map((item, index) => (
        <li key={index} className={styles['item--nested']} onClick={() => handleClose()}>
          <Link prefetch={false} href={item.href || ''} prefix={prefix}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

type NavItemsProps = {
  activeNavItems: MenuProps[][];
  handleNavSelection: Dispatch<MenuProps[]>;
  handleFeaturedArticles: Dispatch<MenuProps>;
  isActive: boolean;
  setIsActive: Dispatch<boolean>;
  isMobileSubnav: boolean;
  setIsMobileSubnav: Dispatch<boolean>;
  handleClose: any;
  prefix?: string;
}

const NavItemsContainer = (props: NavItemsProps) => {
  const { activeNavItems, handleNavSelection, handleFeaturedArticles, isActive, setIsActive, isMobileSubnav, setIsMobileSubnav, handleClose, prefix } = props;
  const { Link } = useContext(EnvironmentContext);
  const isRetina = useMediaQuery({ query: '(any-pointer: coarse)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const hasMenuItems = (item: MenuProps) => {
    return item.items?.some((subItem) => subItem.items) ?? false;
  }

  const setActiveNavAndArticle = (event: React.MouseEvent<HTMLDivElement>, item: MenuProps) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    handleNavSelection(item.items!);
    handleFeaturedArticles(item);
    if (isRetina) {
      setIsActive(false);
      event.currentTarget.classList.remove(styles['active']);
    }

    if (isMobile && !hasMenuItems(item)) {
      setIsMobileSubnav(true);
    }
  }

  const setActiveSubNav = (event: React.MouseEvent<HTMLDivElement>, item: MenuProps) => {
    if (isRetina) {
      if (isMobile) {
        setActiveNavAndArticle(event, item)
      } else {
        const inner_nav_items = document.querySelectorAll('[class^=Navigation_item__inner]');
        inner_nav_items.forEach(inner_nav => {
          inner_nav.classList.remove(styles['active']);
        });
        setIsActive(true);
        event.currentTarget.classList.add(styles['active']);
      }
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, item: MenuProps) => {
    return (hasMenuItems(item) && item.items)
      ? setActiveNavAndArticle(event, item)
      : setActiveSubNav(event, item);
  }

  return (
    <ul
      className={classnames(
        styles['links-container__list'],
        styles['links-container__list--main'],
        isActive ? styles['active-list'] : '',
        isMobileSubnav ? styles['mobile-list'] : '',
      )}
    >
      {activeNavItems[activeNavItems.length - 1]?.map((item, index) => (
        <li key={index} className={styles['item']} >
          {item.href || item.label ? (    // It is a Call to Action
            <div className={styles['item__inner']} onClick={() => handleClose()}>
              <Link prefetch={false} href={item.href || ''} prefix={prefix}>
                {item.label}
              </Link>
            </div>
          ) : (   // It has a Sub Menu
            <>
              <div
                className={styles['item__inner']}
                onClick={(event) => handleClick(event, item)}
                onMouseEnter={() => handleFeaturedArticles(item)} 
              >
                <span>{item.name}</span>
                <IconChevronRight className={styles['icon']} />
              </div>

              {!hasMenuItems(item) && item.items && (isActive || !isRetina) && (
                <SubNavItemsContainer
                  subNavItems={item.items as ButtonProps[]}
                  handleClose={handleClose}
                  prefix={prefix}
                />
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Navigation(props: NavigationProps) {
  const { logoNavBar, logoSideMenu, menu, featuredArticle1, featuredArticle2, loLive, featuredBrandExperience, definedLocales, locale, prefix } = props;
  const { Link } = useContext(EnvironmentContext);
  const [sidebar, setSidebar] = useState(false);
  const [activeNavItems, setActiveNavItems] = useState<MenuProps[][]>([]);
  const [isActive, setIsActive] = useState(false);
  const [featuredArticles, setFeaturedArticles] = useState<ConditionalListCardProps[]>([]);
  const [isMobileSubnav, setIsMobileSubnav] = useState(false);
  const [displayBack, setDisplayBack] = useState(false);
  const [previousCategory, setPreviousCategory] = useState('');
  const [previousURl, setPreviousURl] = useState('');

  const showSidebar = () => setSidebar(!sidebar);

  const router = useRouter()
  const ref = useRef<string[]>([]);
  const history = ref.current;


  useEffect(() => {
    const handleURLChange = (url: string) => {      
      const urlParams = url.split('/');
      
      switch (urlParams[urlParams.length - 2]) {
        case 'news-and-insight':
          setDisplayBack(true);
          setPreviousCategory('News & Insights');
          history.pop()          
          history.push(router.asPath);
          setPreviousURl((history[history.length -1 ] !== `/${prefix}`) && history[history.length -1 ] || ( prefix && `${prefix}/`) + 'news-and-insight')
          break;
          case 'case-study':
            setDisplayBack(true);
            setPreviousCategory('Case Studies');
            history.pop()
            history.push(router.asPath);
          setPreviousURl((history[history.length -1 ] !== `/${prefix}`) && history[history.length -1 ] ||( prefix && `${prefix}/`) + 'case-studies')
          break;
        default:
          setDisplayBack(false);
          setPreviousCategory('');
          break;
      }
    }
    
    router.events?.on('routeChangeStart', (url) => { 
      handleURLChange(url);
    });
    return () => {
      router.events?.off('routeChangeStart', handleURLChange);}
  }, [router, prefix])

  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [sidebar]);

  const handleNavSelection = useCallback((activeNav: any) => {
    if (activeNav === -1) {
      setActiveNavItems((prevActiveNavItems) => (prevActiveNavItems.slice(0, -1)));
      setFeaturedArticles([featuredArticle1, featuredArticle2]);
    } else {
      setActiveNavItems((prevActiveNavItems) => {
        const newSelectedMenus = [...prevActiveNavItems, activeNav];
        return newSelectedMenus;
      });
    }
  }, [featuredArticle1, featuredArticle2]);

  const handleFeaturedArticles = useCallback((activeNav: MenuProps) => {
    if (activeNav.type === 'mainMenu') {
      setFeaturedArticles([featuredArticle1, featuredArticle2]);
    } else if (activeNav.type === 'loLive') {
      setFeaturedArticles([loLive]);
    } else if (activeNav.type === 'brandExperience') {      
      setFeaturedArticles([featuredBrandExperience]);
    }
  }, [featuredArticle1, featuredArticle2, loLive, featuredBrandExperience]);

  const handleOpen = useCallback(() => {
    handleNavSelection(menu);
    setFeaturedArticles([featuredArticle1, featuredArticle2]);
    setSidebar(true);
  }, [menu, featuredArticle1, featuredArticle2, handleNavSelection])

  const handleClose = () => {
    setSidebar(false);
    setActiveNavItems([]);
    setIsActive(false);
    setIsMobileSubnav(false);
  }
  const handleNav = () => {
    router.push(previousURl);
    
  }

  return (
    <div>
      <div className={classnames(styles['navbar'], 'navigation')}>
        <div className={styles['navbar__logo']}>
          <Link prefetch={false} href={'/'} prefix={prefix}>
            <CustomImage priority={false} width={142.5} height={63} alt={logoNavBar.alt} src={`https:${logoNavBar.src}`} loading='eager' />
          </Link>
        </div>
        <div className={styles['navbar__links']}>
          <LanguageSelector definedLocales={definedLocales || []} prefix={prefix || ''} locale={locale || 'en-US'} handleClose={() => undefined} />
          <Button variant='icon' icon={<IconBurgerNav />} onClick={handleOpen} />
        </div>
      </div>
      { displayBack &&
          <div onClick={handleNav} className={` ${styles['previous']}`}>
            <IconBack className={styles['icon']} />
            Back to {previousCategory}
          </div>
        }
      <nav className={`${styles['nav-menu']} ${sidebar && styles['active']}`}>
        <div className={`${styles['nav-menu__inner']}`}>
          <div className={styles['nav-menu__toggle']}>
            <Button variant='icon' icon={<IconClose className={styles['nav-menu__toggle__close']} />} onClick={handleClose} />
          </div>
          <div className={styles['links-container']}>
            {activeNavItems.length > 1 && (
              <button onClick={() => { handleNavSelection(-1); setIsActive(false); setIsMobileSubnav(false) }} className={styles['back']}>
                <IconChevronRight className={styles['icon']} />
                Back
              </button>
            )}
            <div className={styles['links-container__inner']}>
              <NavItemsContainer
                activeNavItems={activeNavItems}
                handleNavSelection={handleNavSelection}
                handleFeaturedArticles={handleFeaturedArticles}
                isActive={isActive}
                setIsActive={setIsActive}
                isMobileSubnav={isMobileSubnav}
                setIsMobileSubnav={setIsMobileSubnav}
                handleClose={handleClose}
                prefix={prefix}
              />
            </div>
          </div>
          <LanguageSelector definedLocales={definedLocales || []} prefix={prefix || ''} locale={locale || 'en-US'} handleClose={handleClose} />
          <FeaturedArticles articleList={featuredArticles} handleClose={handleClose} prefix={prefix} />
        </div>
      </nav >
    </div >
  );
}

export default memo(Navigation);
