import { Form } from "./components/App/App";
import { House } from "./components/Houses/Houses";

export const initialStateForm: Record<string, string | number | string[]> = {};

export const form: Form = [
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

export const data: House = {
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
              title: 'Выберите квартиру',
              items: [
                {
                  label: 'Квартира 1',
                  value: 3,
                },
                {
                  label: 'Квартира 2',
                  value: 4,
                },
                {
                  label: 'Квартира 3',
                  value: 5,
                }
              ]
            },
            {
              label: 'Этаж 2',
              value: 6,
              title: 'Выберите квартиру',
              items: [
                {
                  label: 'Квартира 4',
                  value: 7,
                },
                {
                  label: 'Квартира 5',
                  value: 8,
                },
                {
                  label: 'Квартира 6',
                  value: 9,
                }
              ]
            },
            {
              label: 'Этаж 3',
              value: 11,
              title: 'Выберите квартиру',
              items: [
                {
                  label: 'Квартира 7',
                  value: 12,
                },
                {
                  label: 'Квартира 8',
                  value: 13,
                },
                {
                  label: 'Квартира 9',
                  value: 14,
                }
              ]
            }
          ]
        },
        {
          label: 'Подъезд 2',
          value: 15,
          title: 'Выберите этаж',
          items: [
            {
              label: 'Этаж 2',
              value: 18,
              title: 'Выберите квартиру',
              items: [
                {
                  label: 'Квартира 10',
                  value: 19,
                },
                {
                  label: 'Квартира 11',
                  value: 20,
                },
                {
                  label: 'Квартира 12',
                  value: 21,
                }
              ]
            },
            {
              label: 'Этаж 3',
              value: 22,
              title: 'Выберите квартиру',
              items: [
                {
                  label: 'Квартира 13',
                  value: 23,
                },
                {
                  label: 'Квартира 14',
                  value: 24,
                },
                {
                  label: 'Квартира 15',
                  value: 25,
                }
              ]
            }
          ]
        },
      ]
    },
    {
      label: 'Павлова 1',
      value: 26,
      title: 'Выберите подъезд',
      items: [
        {
          label: 'Подъезд 1',
          value: '27',
          title: 'Выберите этаж',
          items: [
            {
              label: 'Этаж 1',
              value: 28,
              title: 'Выберите квартру',
              items: [
                {
                  label: 'Квартира 999',
                  value: 29,
                },
              ]
            },
          ]
        },
      ]
    }
  ]
}