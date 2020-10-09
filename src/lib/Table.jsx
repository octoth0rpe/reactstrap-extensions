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
  return (
    <>
      <Search onSearch={onSearch} icons={icons} />
      <div className={classes.tableWrapper}>
        {loading && (
          <>          
            <div className={classes.loadingDiv}>
              <Alert color="dark">
                {loadingMessage}
              </Alert>
            </div>
          </>
        )}
        <ReactstrapTable bordered hover {...props}>
          <colgroup>
            {columns.map(({ width }, index) => (
              <col key={index} width={width} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <TableHeader
                  key={index}
                  column={column}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  icons={icons}
                  onSort={onSort}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {loading === false && data.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <Alert color="dark" className="mt-3" fade={false}>
                    <strong>{noDataMessage}</strong>
                  </Alert>
                </td>
              </tr>
            )}
            {data.map((data, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    index={rowIndex}
                    column={column}
                    data={data}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </ReactstrapTable>
      </div>
      {maxPage > 0 && (
        <Paginator
          pageNumber={pageNumber}
          maxPage={maxPage}
          onChangePage={onChangePage}
          icons={icons}
        />
      )}
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.node,
    sortable: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    align: PropTypes.string,
    display: PropTypes.func,
  })),
  icons: PropTypes.shape({
    sortable: PropTypes.node,
    sortAsc: PropTypes.node,
    sortDesc: PropTypes.node,
  }),
  data: PropTypes.array,
  loading: PropTypes.bool,
  onSort: PropTypes.func,
  onChangePage: PropTypes.func,
  pageNumber: PropTypes.number,
  maxPage: PropTypes.number,
  sort: PropTypes.shape({
    field: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
};

Table.defaultProps = {
  icons: {
    sortable: '►',
    sortAsc: '▲',
    sortDesc: '▼',
    first: '↤',
    previous: '←',
    next: '→',
    last: '↦',
  },
  loadingMessage: 'Loading...',
  noDataMessage: 'No results found',
};

export default Table;