function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import PropTypes from 'prop-types';
import { Table as ReactstrapTable, Alert } from 'reactstrap';
import TableHeader from './TableHeader';
import TableCell from './TableCell';
import Paginator from './Paginator';
import Search from './Search';
import classes from './Table.module.css';

const Table = ({
  columns,
  data,
  loading,
  icons,
  sortField,
  sortDirection,
  onSort,
  pageNumber,
  maxPage,
  onChangePage,
  onSearch,
  loadingMessage,
  noDataMessage,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Search, {
    onSearch: onSearch,
    icons: icons
  }), /*#__PURE__*/React.createElement("div", {
    className: classes.tableWrapper
  }, loading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classes.loadingDiv
  }, /*#__PURE__*/React.createElement(Alert, {
    color: "dark"
  }, loadingMessage))), /*#__PURE__*/React.createElement(ReactstrapTable, _extends({
    bordered: true,
    hover: true
  }, props), /*#__PURE__*/React.createElement("colgroup", null, columns.map(({
    width
  }, index) => /*#__PURE__*/React.createElement("col", {
    key: index,
    width: width
  }))), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((column, index) => /*#__PURE__*/React.createElement(TableHeader, {
    key: index,
    column: column,
    sortField: sortField,
    sortDirection: sortDirection,
    icons: icons,
    onSort: onSort
  })))), /*#__PURE__*/React.createElement("tbody", null, loading === false && data.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length
  }, /*#__PURE__*/React.createElement(Alert, {
    color: "dark",
    className: "mt-3",
    fade: false
  }, /*#__PURE__*/React.createElement("strong", null, noDataMessage)))), data.map((data, rowIndex) => /*#__PURE__*/React.createElement("tr", {
    key: rowIndex
  }, columns.map((column, colIndex) => /*#__PURE__*/React.createElement(TableCell, {
    key: colIndex,
    index: rowIndex,
    column: column,
    data: data
  }))))))), maxPage > 0 && /*#__PURE__*/React.createElement(Paginator, {
    pageNumber: pageNumber,
    maxPage: maxPage,
    onChangePage: onChangePage,
    icons: icons
  }));
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.node,
    sortable: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    align: PropTypes.string,
    display: PropTypes.func
  })),
  icons: PropTypes.shape({
    sortable: PropTypes.node,
    sortAsc: PropTypes.node,
    sortDesc: PropTypes.node
  }),
  data: PropTypes.array,
  loading: PropTypes.bool,
  onSort: PropTypes.func,
  onChangePage: PropTypes.func,
  pageNumber: PropTypes.number,
  maxPage: PropTypes.number,
  sort: PropTypes.shape({
    field: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc'])
  })
};
Table.defaultProps = {
  icons: {
    sortable: '►',
    sortAsc: '▲',
    sortDesc: '▼',
    first: '↤',
    previous: '←',
    next: '→',
    last: '↦'
  },
  loadingMessage: 'Loading...',
  noDataMessage: 'No results found'
};
export default Table;