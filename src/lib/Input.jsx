import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  FormText,
  FormFeedback,
  Button,
  ButtonGroup,
  Col,
} from 'reactstrap';

import {
  OPTIONS_PROPTYPE,
  ADDONS_PROPTYPE,
  FORM_GROUP_PROPTYPE,
  INPUT_PROPTYPE,
  VALUE_PROPTYPE,
} from './proptypes';

const typedInput = (type) => (props) => {
  // number requires some special handling to ensure that when the event is
  // passed to onChange, the value is either an int or a float. Without this,
  // the value will be passed a string.
  if (type === 'number') {
    const finalProps = {
      ...props,
      onChange: (e) => {
        const iValue = parseInt(e.target.value);
        const fValue = parseFloat(e.target.value);
        props.onChange({
          target: {
            name: e.target.name,
            value: fValue > iValue ? fValue : iValue,
          },
        });
      },
    };
    return <Input type={type} {...finalProps} />;
  }
  return <Input type={type} {...props} />; 
};

const withSelectOptions = (Component) => ({ options, ...props }) => {
  // selects requires some special handling to ensure that when the event is
  // passed to onChange, the value passed is the original value from the options
  // array. Without this, the value is converted to a string when it may have
  // originally been an int/float/bool.
  const finalProps = {
    ...props,
    onChange: (e) => {
      const sValue = String(e.target.value);
      const value = options
        .find(option => String(option.value) === sValue)
        .value;
      props.onChange({
        target: {
          name: e.target.name,
          value,
        },
      });
    }
  }
  return (
    <Component {...finalProps}>
      {Array.isArray(options) && options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Component>
  );
}

const withAddons = (Component) => ({ prepend, append, ...props }) => (
  prepend || append
    ? (
      <InputGroup>
        {prepend && (
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{prepend}</InputGroupText>
          </InputGroupAddon>
        )}
        <Component {...props} />
        {append && (
          <InputGroupAddon addonType="append">
            <InputGroupText>{append}</InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    ) : <Component {...props} />
);

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
      sm: 2,
    };
    if (check) {
      labelProps.className = 'pt-0';
    }
    return (
      <FormGroup row>
        <Label {...labelProps}>
          {label}
        </Label>
        <Col sm={10}>
          <Component
            valid={valid}
            invalid={typeof error !== 'undefined' && error !== null && error !== ''}
            {...props}
            row
          />
        </Col>
      </FormGroup>
    );
  } else {
    return (
      <FormGroup>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Component
          valid={valid}
          invalid={typeof error !== 'undefined' && error !== null && error !== ''}
          {...props}
        />
        {error && (<FormFeedback>{error}</FormFeedback>)}
        {example && (<FormText>{example}</FormText>)}
      </FormGroup>
    );
  }
};

export const Text = withAddons(typedInput('text'));
Text.propTypes = {
  ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string,
};

export const Number = withAddons(typedInput('number'));
Number.propTypes = {
  ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.number,
};

export const Email = withAddons(typedInput('email'));
Email.propTypes = {
  ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string,
};

export const Password = withAddons(typedInput('password'));
Password.propTypes = {
  ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string,
};

export const Date = withAddons(typedInput('date'));
Date.propTypes = {
  ...INPUT_PROPTYPE,
  ...ADDONS_PROPTYPE,
  value: PropTypes.string,
};

export const File = typedInput('file');
File.propTypes = {
  ...INPUT_PROPTYPE,
  value: PropTypes.string,
};

const Textarea = typedInput('textarea');
Textarea.propTypes = {
  ...INPUT_PROPTYPE,
  rows: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
};

export const Select = withSelectOptions(typedInput('select'));
Select.propTypes = {
  ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE,
};

export const OutlineToggle = ({ name, options, value, onChange }) => (
  <div>
    <ButtonGroup>
      {Array.isArray(options) && options.map(option => (
        <Button
          key={option.value}
          onClick={() => onChange({ target: { name, value: option.value }})}
          outline={option.value !== value}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);
OutlineToggle.propTypes = {
  ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE,
};

export const Toggle = ({ name, options, value, onChange }) => (
  <div>
    <ButtonGroup>
      {Array.isArray(options) && options.map(option => (
        <Button
          key={option.value}
          onClick={() => onChange({ target: { name, value: option.value }})}
          color={option.value === value ? 'info' : 'secondary'}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);
Toggle.propTypes = {
  ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE,
};

export const RadioGroup = ({ name, options, value, onChange }) => (
  <>
    {Array.isArray(options) && options.map(option => (
      <FormGroup key={option.value} check>
        <Label check>
          <Input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange({ target: { name, value: option.value }})}
          />
          {' '}
          {option.label}
        </Label>
      </FormGroup>
    ))}
  </>
);
RadioGroup.propTypes = {
  ...INPUT_PROPTYPE,
  ...OPTIONS_PROPTYPE,
  value: VALUE_PROPTYPE,
};


export const Checkbox = ({ label, name, value, onChange, ...props }) => (
  <FormGroup check>
    <Label>
      <Input
        type="checkbox"
        name={name}
        checked={value}
        onChange={() => onChange({ target: { name, value: !value }})}
        {...props}
      />
      {' '}
      {label}
    </Label>
  </FormGroup>
);
Checkbox.propTypes = {
  ...INPUT_PROPTYPE,
  value: PropTypes.bool,
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
  Textarea: withFormGroup(Textarea),
};

finalInputs.Text.propTypes = {
  ...Text.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.Number.propTypes = {
  ...Number.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.Email.propTypes = {
  ...Email.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.Password.propTypes = {
  ...Password.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.Toggle.propTypes = {
  ...Toggle.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.RadioGroup.propTypes = {
  ...RadioGroup.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.Select.propTypes = {
  ...Select.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.File.propTypes = {
  ...File.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

finalInputs.Textarea.propTypes = {
  ...Textarea.propTypes,
  ...FORM_GROUP_PROPTYPE,
};

export default finalInputs;