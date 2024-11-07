import { ReactComponent as LinkedInIcon } from '../assets/svg/icon-linkedin.svg';

enum SocialType {
  LinkeIn = 'linkedIn',
}

export const socialIconMap: { [key in SocialType]: React.ReactNode } = {
  [SocialType.LinkeIn]: <LinkedInIcon />,
};
