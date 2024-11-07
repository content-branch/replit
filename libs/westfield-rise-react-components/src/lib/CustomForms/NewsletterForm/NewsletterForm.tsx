import { useForm } from 'react-hook-form';
import { FormElement } from '../../Form/Form.types';
import { newsletterDefaultFormElements } from './consts';
import { RightArrow } from '../../Icons/RightArrow';
import styles from './NewsletterForm.module.scss';

/* eslint-disable-next-line */
export interface NewsletterFormProps {
  formElements?: {
    [key: string]: FormElement;
  };
  error?: string;
  onSubmit?: (data: { email: string }) => void;
}

export function NewsletterForm(props: NewsletterFormProps) {
  const {
    formElements = newsletterDefaultFormElements,
    error,
    onSubmit,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmitHandler = (data: any) => {
    if (!onSubmit || typeof onSubmit !== 'function') {
      console.log('Submitted', data);
    } else onSubmit?.(data);
  };

  const emailErrorMessage =
    errors.email?.type === 'pattern'
      ? (formElements.newsletter.errorMessages && formElements.newsletter.errorMessages[0]) ?? "Please enter a valid email address"
      : touchedFields.email && errors.email && (error || ((formElements.newsletter.errorMessages && formElements.newsletter.errorMessages[1]) ?? 'Email is required'));

  return (
    <div className={styles.newsletter__container}>
      <div className={styles.newsletter__container_inner}>
        <div className={styles.newsletter__text}>{formElements.newsletter.label}</div>
        <div className={styles.newsletter__input_wrapper}>
          <form
            className={styles.newsletter__form}
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <input
              id="email"
              className={styles.newsletter__input}
              placeholder={formElements.newsletter.placeholder}
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            />
            <button
              id="register-for-newletter"
              type="submit"
              className={styles.newsletter__button}
            >
              <RightArrow />
            </button>
            {errors && (
              <div className={styles.newsletter__error}>
                {emailErrorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewsletterForm;
