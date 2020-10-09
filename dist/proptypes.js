import PropTypes from 'prop-types';
export const VALUE_PROPTYPE = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]);
export const OPTIONS_PROPTYPE = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: VALUE_PROPTYPE
  })).isRequired
};
export const ADDONS_PROPTYPE = {
  prepend: PropTypes.node,
  append: PropTypes.node
};
export const FORM_GROUP_PROPTYPE = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  example: PropTypes.node,
  error: PropTypes.node,
  row: PropTypes.bool
};
export const INPUT_PROPTYPE = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: VALUE_PROPTYPE.isRequired,
  onChange: PropTypes.func.isRequired
};