import Button from '../Button/Button';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination(props: PaginationProps) {
  const { currentPage, totalItems, itemsPerPage, onPageChange } = props;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className={styles['container']}>
      <Button
        variant="default"
        style="secondary"
        label="Previous"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      />
      <span className={styles['page-count']}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="default"
        style="secondary"
        label="Next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}

export default Pagination;
