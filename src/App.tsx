import './App.css'
import { Field, Form } from './form/form';
import { House, Select } from './select/selects';
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

  const houses: House[] = [
    {
      id: 1,
      name: 'Дом 1',
      entrances: [
        { id: 1, floors: 5, apartmentsPerFloor: 6 },
        { id: 2, floors: 2, apartmentsPerFloor: 2 },
      ]
    },
    {
      id: 2,
      name: 'Дом 2',
      entrances: [
        { id: 1, floors: 7, apartmentsPerFloor: 2 },
        { id: 2, floors: 2, apartmentsPerFloor: 6 },
        { id: 3, floors: 3, apartmentsPerFloor: 4 },
        { id: 4, floors: 4, apartmentsPerFloor: 7 },
        { id: 5, floors: 5, apartmentsPerFloor: 3 },
      ],
    },
    {
      id: 3,
      name: 'Дом 3',
      entrances: [
        { id: 1, floors: 6, apartmentsPerFloor: 8 },
        { id: 2, floors: 2, apartmentsPerFloor: 7 },
        { id: 3, floors: 3, apartmentsPerFloor: 5 },
        { id: 4, floors: 4, apartmentsPerFloor: 4 },
      ],
    },
  ];

  return (
    <>
      <Form form={form}/>
      <Select houses={houses}/>
    </>
  )
}

export default App
