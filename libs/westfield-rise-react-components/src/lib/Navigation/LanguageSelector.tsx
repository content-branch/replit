import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';

import { DropDownArrowIconNav } from '../Icons/DropDownArrowIconNav';
import { LanguageIcon } from '../Icons/LanguageIcon';
import { definedLocaleProps } from './Navigation';
import { RadioGroup } from '../Form/RadioGroup';
import classnames from 'classnames';

import styles from './Navigation.module.scss';

interface LanguageSelectorProps {
  definedLocales: definedLocaleProps[];
  locale: string;
  prefix: string;
  handleClose?: any;
};

function LanguageSelector(props: LanguageSelectorProps) {
  const { definedLocales, locale, prefix, handleClose } = props;
  const currentLanguage = definedLocales?.find((localeItem: definedLocaleProps) => localeItem.code === locale)?.name.substring(0, 3);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(prefix === '' ? 'en' : prefix);
  const router = useRouter();
  const initialRef: any = null;
  const languageSelectorRef = useRef(initialRef);

  const definedLocalesFormatted = definedLocales.map((locale: definedLocaleProps) => {
    return {
      value: locale.code.replace(/(\w+)-\w+/g, "$1"),
      label: locale.name.replace(/(\w+)\s*\(.+\)/g, "$1"),
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    const link = prefix !== '' ? router.asPath.replace(prefix, event.target.value.replace('en', '')) : '/' + event.target.value.replace('en', '') + router.asPath;
    router.push(link);
    setIsOpen(false);
    handleClose();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setSelected(prefix === '' ? 'en' : prefix);
  }, [prefix]);

  useEffect(() => {
    window.addEventListener('scroll', closeDropdown);
    window.addEventListener('click', event => {
      if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
        closeDropdown();
      }
    })

    return () => {
      window.removeEventListener('scroll', closeDropdown);
    };
  }, []);

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles['language_wrap']}>
      <div className={styles['language_selector']} ref={languageSelectorRef} onClick={toggleDropdown}>
        <LanguageIcon className={classnames(styles['icon'], styles['language'])} />
        <span>{currentLanguage}</span>
        {isOpen ? (
          <DropDownArrowIconNav className={classnames(styles['icon'], styles['dropdown'])} transform={'rotate(180)'} />
        ) : (
          <DropDownArrowIconNav className={classnames(styles['icon'], styles['dropdown'])} />
        )}
        {isOpen ? (
          <div className={styles['language_list']} onClick={stopPropagation}>
            <RadioGroup
              label={''}
              errorMessages={[]}
              id={'languageSelector'}
              options={definedLocalesFormatted}
              register={undefined}
              errors={[]}
              selected={selected}
              handleChange={handleChange}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default LanguageSelector