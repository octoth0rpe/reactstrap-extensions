import * as React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


import useDebounce from './useDebounce';

export const Search = ({ onSearch, icons }) => {
  const [value, setValue, debouncedValue] = useDebounce('');
  React.useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <InputGroup className="mb-1">
      {'search' in icons && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{icons.search}</InputGroupText>
        </InputGroupAddon>
      )}
      <input
        className="form-control"
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </InputGroup>
  );
};


Search.propTypes = {
  icons: PropTypes.shape({
    search: PropTypes.node,
  }),
  onSearch: PropTypes.func,
};

export default Search