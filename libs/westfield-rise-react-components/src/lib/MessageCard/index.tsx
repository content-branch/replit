import { MessageOkIcon } from '../Icons/MessageOkIcon';
import styles from './MessageCard.module.scss';
import classnames from 'classnames';

type MessageCardProps = {
  icon: React.ReactNode;
  title: string;
  message: string;
  className?: string;
  style?: React.CSSProperties;
};

export const MessageCard = ({
  icon,
  title,
  message,
  className,
  style,
}: MessageCardProps) => {
  return (
    <div className={classnames(styles.message_card, className)} style={style}>
      <div className={styles.message_card__icon}>{icon}</div>
      <div className={styles.message_card__title}>{title}</div>
      <div className={styles.message_card__message}>{message}</div>
    </div>
  );
};

MessageCard.defaultProps = {
  icon: <MessageOkIcon />,
  title: 'Message Card Title',
  message:
    'Message card message here so you can see what it looks like. Change this text to see what it looks like with a longer message.',
  style: {},
};
