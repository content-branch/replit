import Link from 'next/link';

import { Button, MotionTheoryHeader, CustomImage } from '@westfield-rise/westfield-rise-react-components';

// eslint-disable-next-line @nx/enforce-module-boundaries
import logoNavBar from '../../../libs/westfield-rise-react-components/src/lib/assets/img/logo-nav-bar.png';

import styles from './Page404.module.scss';

export default function Error({ statusCode }: { statusCode: number }) {
    return (
        <div className={styles['page']}>
            <nav className={styles['navbar']}>
                <div className={styles['navbar__logo']}>
                    <Link href={'/'}>
                        <CustomImage width={142.5} height={63} alt={'Navigation WR logo'} src={logoNavBar} />
                    </Link>
                </div>
            </nav>
            <div className={styles['container']}>
                <MotionTheoryHeader theme='ultraviolet' />
                <h1 className={styles['title']}>
                    Unexpected error
                    Please try again later.
                </h1>
                <div className={styles['container__inner']}>
                    <div className={styles['message']}>
                        <div className={styles['error']}>
                            500
                        </div>
                        <div className={styles['description']}>
                            An internal server error has occurred.
                        </div>
                    </div>
                    <Button variant='default' style='primary' label='Back home' href='/' />
                </div>
            </div>
            <footer className={styles['footer']}>
                <div className={styles['footer__copyright']}>
                    © 2023 Westfield Rise
                </div>
                <div className={styles['footer__links']}>
                    <Link href={'/legal-notices'}>Legal Notices</Link>
                    <Link href={'/privacy-policies'}>Privacy Policies</Link>
                    <Link href={'/cookie-policies'}>Cookie Policies</Link>
                </div>
            </footer>
        </div>
    );
}

export const getInitialProps = ({ res, err }: { res: any, err: any }) => {

    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
}
