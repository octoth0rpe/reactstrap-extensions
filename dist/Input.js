function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label, FormText, FormFeedback, Button, ButtonGroup, Col } from 'reactstrap';
import { OPTIONS_PROPTYPE, ADDONS_PROPTYPE, FORM_GROUP_PROPTYPE, INPUT_PROPTYPE, VALUE_PROPTYPE } from './proptypes';

const typedInput = type => props => {
  // number requires some special handling to ensure that when the event is
  // passed to onChange, the value is either an int or a float. Without this,
  // the value will be passed a string.
  if (type === 'number') {
    const finalProps = { ...props,
      onChange: e => {
        const iValue = parseInt(e.target.value);
        const fValue = parseFloat(e.target.value);
        props.onChange({
          target: {
            name: e.target.name,
            value: fValue > iValue ? fValue : iValue
          }
        });
      }
    };
    return /*#__PURE__*/React.createElement(Input, _extends({
      type: type
    }, finalProps));
  }

  return /*#__PURE__*/React.createElement(Input, _extends({
    type: type
  }, props));
};

const withSelectOptions = Component => ({
  options,
  ...props
}) => {
  // selects requires some special handling to ensure that when the event is
  // passed to onChange, the value passed is the original value from the options
  // array. Without this, the value is converted to a string when it may have
  // originally been an int/float/bool.
  const finalProps = { ...props,
    onChange: e => {
      const sValue = String(e.target.value);
      const value = options.find(option => String(option.value) === sValue).value;
      props.onChange({
        target: {
          name: e.target.name,
          value
        }
      });
    }
  };
  return /*#__PURE__*/React.createElement(Component, finalProps, Array.isArray(options) && options.map(option => /*#__PURE__*/React.createElement("option", {
    key: option.value,
    value: option.value
  }, option.label)));
};

const withAddons = Component => ({
  prepend,
  append,
  ...props
}) => prepend || append ? /*#__PURE__*/React.createElement(InputGroup, null, prepend && /*#__PURE__*/React.createElement(InputGroupAddon, {
  addonType: "prepend"
}, /*#__PURE__*/React.createElement(InputGroupText, null, prepend)), /*#__PURE__*/React.createElement(Component, props), append && /*#__PURE__*/React.createElement(InputGroupAddon, {
  addonType: "append"
}, /*#__PURE__*/React.createElement(InputGroupText, null, append))) : /*#__PURE__*/React.createElement(Component, props);

const withFormGroup = (Component, check = false) => ({
  label,
  example,
  error,
  valid,
  row,
  ...props
}) => {
  if (row) {
    const labelProps = {
      htmlFor: props.id || props.name,
      sm: 2
    };

    if (check) {
      labelProps.className = 'pt-0';
    }

    return /*#__PURE__*/React.createElement(FormGroup, {
      row: true
    }, /*#__PURE__*/React.createElement(Label, labelProps, label), /*#__PURE__*/React.createElement(Col, {
      sm: 10
    }, /*#__PURE__*/React.createElement(Component, _extends({
      valid: valid,
      invalid: typeof error !== 'undefined' && error !== null && error !== ''
    }, props, {
      row: true
    }))));
  } else {
    return /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      htmlFor: props.id || props.name
    }, label), /*#__PURE__*/React.createElement(Component, _extends({
      valid: valid,
      invalid: typeof error !== 'undefined' && error !== null && error !== ''
    }, props)), error && /*#__PURE__*/React.createElement(FormFeedback, null, error), example && /*#__PURE__*/React.createElement(FormText, null, example));
  }
};

export const Text = withAddons(typedInput('text'));
Text.propTypes = { ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string
};
export const Number = withAddons(typedInput('number'));
Number.propTypes = { ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.number
};
export const Email = withAddons(typedInput('email'));
Email.propTypes = { ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string
};
export const Password = withAddons(typedInput('password'));
Password.propTypes = { ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string
};
export const Date = withAddons(typedInput('date'));
Date.propTypes = { ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string
};
export const File = typedInput('file');
File.propTypes = { ...INPUT_PROPTYPE,
  value: PropTypes.string
};
const Textarea = typedInput('textarea');
Textarea.propTypes = { ...INPUT_PROPTYPE,
  rows: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string
};
export const Select = withSelectOptions(typedInput('select'));
Select.propTypes = { ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE
};
export const OutlineToggle = ({
  name,
  options,
  value,
  onChange
}) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ButtonGroup, null, Array.isArray(options) && options.map(option => /*#__PURE__*/React.createElement(Button, {
  key: option.value,
  onClick: () => onChange({
    target: {
      name,
      value: option.value
    }
  }),
  outline: option.value !== value
}, option.label))));
OutlineToggle.propTypes = { ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE
};
export const Toggle = ({
  name,
  options,
  value,
  onChange
}) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ButtonGroup, null, Array.isArray(options) && options.map(option => /*#__PURE__*/React.createElement(Button, {
  key: option.value,
  onClick: () => onChange({
    target: {
      name,
      value: option.value
    }
  }),
  color: option.value === value ? 'info' : 'secondary'
}, option.label))));
Toggle.propTypes = { ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE
};
export const RadioGroup = ({
  name,
  options,
  value,
  onChange
}) => /*#__PURE__*/React.createElement(React.Fragment, null, Array.isArray(options) && options.map(option => /*#__PURE__*/React.createElement(FormGroup, {
  key: option.value,
  check: true
}, /*#__PURE__*/React.createElement(Label, {
  check: true
}, /*#__PURE__*/React.createElement(Input, {
  type: "radio",
  name: name,
  value: option.value,
  checked: option.value === value,
  onChange: () => onChange({
    target: {
      name,
      value: option.value
    }
  })
}), ' ', option.label))));
RadioGroup.propTypes = { ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE
};
export const Checkbox = ({
  label,
  name,
  value,
  onChange,
  ...props
}) => /*#__PURE__*/React.createElement(FormGroup, {
  check: true
}, /*#__PURE__*/React.createElement(Label, null, /*#__PURE__*/React.createElement(Input, _extends({
  type: "checkbox",
  name: name,
  checked: value,
  onChange: () => onChange({
    target: {
      name,
      value: !value
    }
  })
}, props)), ' ', label));
Checkbox.propTypes = { ...INPUT_PROPTYPE,
  value: PropTypes.bool
};
const finalInputs = {
  withFormGroup,
  withAddons,
  Text: withFormGroup(Text),
  Date: withFormGroup(Date),
  Number: withFormGroup(Number),
  Email: withFormGroup(Email),
  Password: withFormGroup(Password),
  Checkbox: Checkbox,
  Toggle: withFormGroup(Toggle),
  RadioGroup: withFormGroup(RadioGroup, true),
  Select: withFormGroup(Select),
  File: withFormGroup(File),
  Textarea: withFormGroup(Textarea)
};
finalInputs.Text.propTypes = { ...Text.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.Number.propTypes = { ...Number.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.Email.propTypes = { ...Email.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.Password.propTypes = { ...Password.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.Toggle.propTypes = { ...Toggle.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.RadioGroup.propTypes = { ...RadioGroup.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.Select.propTypes = { ...Select.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.File.propTypes = { ...File.propTypes,
  ...FORM_GROUP_PROPTYPE
};
finalInputs.Textarea.propTypes = { ...Textarea.propTypes,
  ...FORM_GROUP_PROPTYPE
};
export default finalInputs;