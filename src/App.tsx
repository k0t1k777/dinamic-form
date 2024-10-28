import './App.css'
import { Field, Form } from './form/form';
export type Form = Field[];

function App() {
  const form: Form = [
    {
      type: 'checkbox',
      options: [
      {
        title: "1",
        value: "2",
      },
      {
        title: "2",
        value: "3",
      }],
      name: "rooms",
      label: "Комнаты"
    },
    {
      type: 'radio',
      options: [
        {
          value: '0',
          title: 'III кв 2025'
        },
      {
        value: '1',
        title: 'II кв 2025'
      },
      {
        value: '2',
        title: 'I кв 2025'
      }],
      name: "date",
      label: "Срок сдачи"
    },
    {
      type: 'range',
      name: "rangeCost",
      label: "Цена, млн ₽",
      min: 1,
      max: 20,
    },
  ]

  return (
    <>
      <Form form={form}/>
    </>
  )
}

export default App
