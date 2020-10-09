import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styles from './Paginator.module.css';
export const Paginator = ({
  pageNumber,
  maxPage,
  onChangePage,
  rangeSize,
  icons
}) => {
  const allowPrevious = pageNumber === 1;
  const allowNext = pageNumber === maxPage;
  const pageRange = [pageNumber - rangeSize / 2, pageNumber + rangeSize / 2];

  while (pageRange[0] < 1) {
    pageRange[0]++;
    pageRange[1]++;
  }

  while (pageRange[1] > maxPage) {
    pageRange[1]--;
  }

  const numPages = pageRange[1] - pageRange[0];
  const startEllipsis = pageRange[0] > 1 && numPages === rangeSize;
  const endEllipsis = pageRange[1] < maxPage && numPages === rangeSize;
  const rangeArray = new Array(numPages + 1).fill(0, 0, numPages + 1).map((_, index) => index + pageRange[0]);

  const getPage = page => {
    if (page === pageRange[0] && startEllipsis) {
      return '...';
    } else if (page === pageRange[1] && endEllipsis) {
      return '...';
    }

    return page;
  };

  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("span", {
    className: "float-right mt-1"
  }, "Page ", pageNumber, " of ", maxPage), /*#__PURE__*/React.createElement(Pagination, null, /*#__PURE__*/React.createElement(PaginationItem, null, /*#__PURE__*/React.createElement(PaginationLink, {
    className: styles.page,
    disabled: allowPrevious,
    first: true,
    onClick: () => onChangePage(1)
  }, icons.first)), /*#__PURE__*/React.createElement(PaginationItem, null, /*#__PURE__*/React.createElement(PaginationLink, {
    className: styles.page,
    disabled: allowPrevious,
    previous: true,
    onClick: () => onChangePage(pageNumber - 1)
  }, icons.previous)), rangeArray.map(page => /*#__PURE__*/React.createElement(PaginationItem, {
    key: page,
    active: page === pageNumber
  }, /*#__PURE__*/React.createElement(PaginationLink, {
    onClick: () => onChangePage(page),
    className: styles.page
  }, getPage(page)))), /*#__PURE__*/React.createElement(PaginationItem, null, /*#__PURE__*/React.createElement(PaginationLink, {
    className: styles.page,
    disabled: allowNext,
    next: true,
    onClick: () => onChangePage(pageNumber + 1)
  }, icons.next)), /*#__PURE__*/React.createElement(PaginationItem, null, /*#__PURE__*/React.createElement(PaginationLink, {
    className: styles.page,
    disabled: allowNext,
    last: true,
    onClick: () => onChangePage(maxPage)
  }, icons.last))));
};
Paginator.defaultProps = {
  rangeSize: 6
};
export default Paginator;