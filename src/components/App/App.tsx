import './App.css'
import { Houses } from '../Houses/Houses';
import { Field, Form } from '../Form/Form';
import { data, form } from '../../const';
export type Form = Field[];

function App() {
  return (
    <>
      <Form form={form} />
      <Houses data={data} />
    </>
  )
}

export default App


