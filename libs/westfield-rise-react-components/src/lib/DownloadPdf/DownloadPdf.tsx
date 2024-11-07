import Button from '../Button/Button';
import { THEMES } from '../constants';
import styles from './DownloadPdf.module.scss';

import classnames from 'classnames';

interface PdfProps {
  file: {
    url: string;
    fileName: string;
  };
  title: string;
}
export interface DownloadPdfProps {
  theme?: THEMES;
  text: string;
  ctaProps: { pdf: PdfProps; label: string; isExternal?: boolean };
}

export function DownloadPdf(props: DownloadPdfProps) {
  const { theme, text, ctaProps } = props;
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = ctaProps.pdf.file.url;
    downloadLink.download = ctaProps.pdf.title;
    downloadLink.target = '_blank';
    downloadLink.click();
  };
  return (
    <div className={classnames(styles['container'], styles[`container--${theme}`])}>
      <div className={styles['text']}>{text}</div>
      <div className={styles.link}>
        <Button
          onClick={handleDownload}
          label={ctaProps.label}
          {...{
            variant: 'default',
            style: 'primary',
            isExternal: ctaProps.isExternal,
          }}
        />
      </div>
    </div>
  );
}

export default DownloadPdf;
