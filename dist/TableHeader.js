import * as React from 'react';
import PropTypes from 'prop-types';
import classes from './TableHeader.module.css';
export const TableHeader = ({
  column,
  sortField,
  sortDirection,
  icons,
  onSort
}) => {
  let className = column.align !== 'left' ? `text-${column.align}` : null;

  if (column.sortable === false) {
    return /*#__PURE__*/React.createElement("th", {
      className: className
    }, column.label);
  }

  className = `${className} ${classes.header}`;

  const nextSort = () => onSort(column.name, column.name === sortField ? sortDirection === 'asc' ? 'desc' : 'asc' : 'asc');

  let icon = null;

  if (column.name === sortField) {
    icon = icons[sortDirection === 'asc' ? 'sortAsc' : 'sortDesc'];
  } else {
    icon = icons.sortable;
  }

  return /*#__PURE__*/React.createElement("th", {
    className: className,
    onClick: nextSort
  }, column.label, ' ', /*#__PURE__*/React.createElement("span", {
    className: classes.sort_icon
  }, icon));
};
TableHeader.propTypes = {
  column: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.node,
    sortable: PropTypes.bool,
    align: PropTypes.string,
    display: PropTypes.func
  }),
  sortField: PropTypes.string,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  icons: PropTypes.shape({
    sortable: PropTypes.node,
    sortAsc: PropTypes.node,
    sortDesc: PropTypes.node
  }),
  onSort: PropTypes.func
};
export default TableHeader;