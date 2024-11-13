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
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 3
            },
            {
              id: 2,
              apartmentsPerFloor: 4
            },
            {
              id: 3,
              apartmentsPerFloor: 5
            },
            {
              id: 4,
              apartmentsPerFloor: 9
            }
          ]
        },
        {
          id: 2,
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 6
            },
            {
              id: 2,
              apartmentsPerFloor: 7
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
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 1
            },
            {
              id: 2,
              apartmentsPerFloor: 6
            },
            {
              id: 3,
              apartmentsPerFloor: 8
            }
          ]
        },
        {
          id: 2,
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 6
            },
            {
              id: 2,
              apartmentsPerFloor: 2
            },
            {
              id: 3,
              apartmentsPerFloor: 3
            }
          ]
        },
        {
          id: 3,
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 10
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
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 1
            },
            {
              id: 2,
              apartmentsPerFloor: 6
            },
            {
              id: 3,
              apartmentsPerFloor: 7
            }
          ]
        },
        {
          id: 2,
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 11
            },
            {
              id: 2,
              apartmentsPerFloor: 12
            },
            {
              id: 3,
              apartmentsPerFloor: 13
            }
          ]
        },
        {
          id: 3,
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 9
            },
          ]
        },
        {
          id: 4,
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 7
            },
          ]
        },
        {
          id: 5,
          floors: [
            {
              id: 1,
              apartmentsPerFloor: 3
            },
            {
              id: 2,
              apartmentsPerFloor: 2
            },
            {
              id: 3,
              apartmentsPerFloor: 4
            },
            {
              id: 4,
              apartmentsPerFloor: 7
            },
            {
              id: 5,
              apartmentsPerFloor: 21
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
