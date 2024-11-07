import Button, { ButtonProps } from "../Button/Button";

import styles from './CtaWrapper.module.scss';


export interface CtaWrapperProps {
    name: string;
    prefix?: string;
    ctas: ButtonProps[];
}
export function CtaWrapper (props: CtaWrapperProps) {
    const { ctas, prefix } = props;
    return <div className={styles['container']}>
        {ctas.map((cta, index) => {
            if (cta.isPopup) {
                return <Button
                    key={index}
                    type='button'
                    {... { variant: 'default', style: index%2 ===0 ? 'primary' : 'secondary', isExternal: false }}
                    label={cta.label}
                    isPopup={cta.isPopup}
                    popupContent={cta.popupContent}
                    popupClass={"modal_accordion_wrapper"}
                />
            } else {
                return <Button
                    key={index}
                    type='button'
                    {... { variant: 'default', style: index%2 ===0 ? 'primary' : 'secondary', isExternal: false, href: cta.href, prefix: prefix }}
                    label={cta.label}
                />
            }
        }
    
        )}
    </div>
}

export default CtaWrapper