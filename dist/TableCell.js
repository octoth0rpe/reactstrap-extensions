import * as React from 'react';
import PropTypes from 'prop-types';
export const TableCell = ({
  column,
  index,
  data
}) => /*#__PURE__*/React.createElement("td", {
  className: column.align !== 'left' ? `text-${column.align}` : null
}, column.display(data, index));
TableCell.propTypes = {
  column: PropTypes.shape({
    align: PropTypes.string,
    display: PropTypes.func
  }),
  data: PropTypes.shape()
};
export default TableCell;