import * as React from "react";
import { Container } from 'reactstrap';

import Input from './lib/Input';
import Table from './lib/Table';

const OPTIONS = [
  { label: 'Red', value: 1 },
  { label: 'Blue', value: 2 },
  { label: 'Green', value: 3 },
];

const App = () => {
  const [state, setState] = React.useState({
    text: '',
    number: 0,
    email: '',
    password: '',
    color: 3,
    textarea: '',
    accept: false,
  });

  const columns = [
    {
      label: 'Name',
      sortable: true,
      display: data => data.name,
    },
    {
      label: 'Age',
      sortable: true,
      display: data => data.age,
      width: 50,
      align: 'right',
    },
  ];

  const data = [
    { name: 'Mike', age: 39 },
    { name: 'Allie', age: 33 },
    { name: 'Sophie', age: 5 },
  ];

  return (
    <Container fluid>
      <Table columns={columns} loading={false} data={data} size="sm" hover responsive striped bordered />
      <Input.Checkbox
        label="I accept the terms of use"
        name="accept"
        value={state.accept}
        example="some example text"
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
      />
      <Input.Text
        label="Text"
        name="text"
        value={state.text}
        example="some example text"
        placeholder="type your name here"
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
      />
      <Input.Number
        label="Number"
        name="number"
        value={state.number}
        example="some example text"
        placeholder="type your name here"
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        prepend="$"
        append=".00"
      />
      <Input.Email
        label="Email"
        name="email"
        value={state.email}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        example="some example text"
        placeholder="type your email here"
      />
      <Input.Password
        label="Password"
        name="password"
        value={state.password}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        example="some example text"
        placeholder="type your password here"
      />
      <Input.RadioGroup
        label="Color"
        name="color"
        value={state.color}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        options={OPTIONS}
        example="some example text"
      />
      <Input.Select
        label="Color"
        name="color"
        value={state.color}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        options={OPTIONS}
        example="some example text"
      />
      <Input.Toggle
        label="Color"
        name="color"
        value={state.color}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        options={OPTIONS}
        example="some example text"
      />
      <Input.Textarea
        label="Lots o text"
        name="textarea"
        value={state.textarea}
        onChange={e => setState({ ...state, [e.target.name]: e.target.value })}
        example="some example text"
        rows={6}
      />
    </Container>
  );
};

export default App;