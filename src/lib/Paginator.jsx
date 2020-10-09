import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import styles from './Paginator.module.css';

export const Paginator = ({ pageNumber, maxPage, onChangePage, rangeSize, icons }) => {
  const allowPrevious = pageNumber === 1;
  const allowNext = pageNumber === maxPage;

  const pageRange = [pageNumber - (rangeSize / 2), pageNumber + (rangeSize / 2)];

  while (pageRange[0] < 1) {
    pageRange[0]++;
    pageRange[1]++;
  }
  while (pageRange[1] > maxPage) {
    pageRange[1]--;
  }

  const numPages = pageRange[1] - pageRange[0];
  const startEllipsis = (pageRange[0] > 1 && numPages === rangeSize);
  const endEllipsis = (pageRange[1] < maxPage && numPages === rangeSize);

  const rangeArray = (new Array(numPages + 1))
    .fill(0, 0, numPages + 1)
    .map((_, index) => index + pageRange[0]);

  const getPage = (page) => {
    if (page === pageRange[0] && startEllipsis) {
      return '...';
    } else if (page === pageRange[1] && endEllipsis) {
      return '...';
    }
    return page;
  };

  return (
    <section>
      <span className="float-right mt-1">Page {pageNumber} of {maxPage}</span>
      <Pagination>
        <PaginationItem>
          <PaginationLink className={styles.page} disabled={allowPrevious} first onClick={() => onChangePage(1)}>
            {icons.first}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className={styles.page} disabled={allowPrevious} previous onClick={() => onChangePage(pageNumber - 1)}>
            {icons.previous}
          </PaginationLink>
        </PaginationItem>
        {rangeArray.map(page => (
          <PaginationItem key={page} active={page === pageNumber}>
            <PaginationLink onClick={() => onChangePage(page)} className={styles.page}>
              {getPage(page)}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink className={styles.page} disabled={allowNext} next onClick={() => onChangePage(pageNumber + 1)}>
            {icons.next}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className={styles.page} disabled={allowNext} last onClick={() => onChangePage(maxPage)}>
            {icons.last}
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </section>
  );
};

Paginator.defaultProps = {
  rangeSize: 6,
};

export default Paginator;