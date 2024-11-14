import './App.css'
import { House, Houses } from '../Houses/Houses';
import { Field, Form } from '../Form/Form';
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

  const data: House = {
    title: 'Выберите дом',
    items: [
      {
        label: 'Хрустальная 38',
        value: 0,
        title: 'Выберите подъезд',
        items: [
          {
            label: 'Подъезд 1',
            value: 1,
            title: 'Выберите этаж',
            items: [
              {
                label: 'Этаж 1',
                value: 2,
              },
              {
                label: 'Этаж 2',
                value: 3,
              },
              {
                label: 'Этаж 3',
                value: 4,
              }
            ]
          },
          {
            label: 'Подъезд 2',
            value: 7,
            title: 'Выберите этаж',
            items: [
              {
                label: 'Этаж 2',
                value: 8,
              },
              {
                label: 'Этаж 3',
                value: 9,
              }
            ]
          },
        ]
      },
      {
        label: 'Павлова 1',
        value: 11,
        title: 'Выберите подъезд',
        items: [
          {
            label: 'Подъезд 1',
            value: 5,
            title: 'Выберите этаж',
            items: [
              {
                label: 'Этаж 1',
                value: 6,
              },
            ]
          },
        ]
      }
    ]
  }

  return (
    <>
      <Form form={form} />
      <Houses data={data} />
    </>
  )
}

export default App


