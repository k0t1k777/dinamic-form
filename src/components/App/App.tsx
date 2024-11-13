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

  const houses: House[] = [
    {
      id: 1,
      label: 'Хрустальная 38',
      entrances: [
        {
          id: 1,
          label: 'Подъезд 1',
          floors: [
            {
              id: 1,
              flats: 3
            },
            {
              id: 2,
              flats: 4
            },
            {
              id: 3,
              flats: 5
            },
            {
              id: 4,
              flats: 9
            }
          ]
        },
        {
          id: 2,
          label: 'Подъезд 2',
          floors: [
            {
              id: 1,
              flats: 7
            },
          ]
        },
      ],
    },
    {
      id: 2,
      label: 'Локомотивная 8',
      entrances: [
        {
          id: 1,
          label: 'Подъезд 1',
          floors: [
            {
              id: 1,
              flats: 1
            },
            {
              id: 2,
              flats: 6
            },
            {
              id: 3,
              flats: 8
            }
          ]
        },
        {
          id: 2,
          label: 'Подъезд 2',
          floors: [
            {
              id: 1,
              flats: 2
            },
            {
              id: 2,
              flats: 3
            }
          ]
        },
        {
          id: 3,
          label: 'Подъезд 3',
          floors: [
            {
              id: 1,
              flats: 10
            },
          ]
        },
      ],
    },
    {
      id: 3,
      label: 'Гончарова 1',
      entrances: [
        {
          id: 1,
          label: 'Подъезд 1',
          floors: [
            {
              id: 1,
              flats: 1
            },
            {
              id: 2,
              flats: 6
            },
            {
              id: 3,
              flats: 7
            }
          ]
        },
        {
          id: 2,
          label: 'Подъезд 2',
          floors: [
            {
              id: 1,
              flats: 12
            },
            {
              id: 2,
              flats: 13
            }
          ]
        },
        {
          id: 3,
          label: 'Подъезд 3',
          floors: [
            {
              id: 1,
              flats: 9
            },
            {
              id: 2,
              flats: 11
            },
            {
              id: 3,
              flats: 12
            },
          ]
        },
        {
          id: 4,
          label: 'Подъезд 4',
          floors: [
            {
              id: 1,
              flats: 7
            },
          ]
        },
        {
          id: 5,
          label: 'Подъезд 5',
          floors: [
            {
              id: 1,
              flats: 3
            },
            {
              id: 2,
              flats: 2
            },
            {
              id: 3,
              flats: 4
            },
            {
              id: 4,
              flats: 7
            },
            {
              id: 5,
              flats: 21
            },
          ]
        },
      ],
    },
  ];

  return (
    <>
      <Form form={form} />
      <Houses houses={houses} />
    </>
  )
}

export default App
