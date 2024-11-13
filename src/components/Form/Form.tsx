import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectForm, setLocalStore } from '../../store/features/slice/formReducer';
import { initialStateForm } from '../../const';
import { Button } from '../../ui/Button/Button';

interface Option {
  title: string;
  value: string;
}

export interface Field {
  type: string;
  options?: Option[];
  name: string;
  label: string;
  min?: number;
  max?: number;
}

export interface FormProps {
  form: Field[];
}

export const Form: React.FC<FormProps> = ({ form }) => {
  const [showFields, setShowFields] = useState(false);
  const dispatch = useAppDispatch();
  const { localStore } = useAppSelector(selectForm);
  const handleChange = (fieldName: string, value: any) => {
    const newLocalStore = {
      ...localStore,
      [fieldName]: value,
    };
    dispatch(setLocalStore(newLocalStore));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Сохраненные данные:', localStore);
  };

  const handleReset = (): void => {
    const resetState: Record<string, string | number | string[]> = {};

    form.forEach(field => {
      if (field.type === 'radio') {
        resetState[field.name] = '';
      } else if (field.type === 'range') {
        resetState[field.name] = field.min !== undefined ? field.min : 0;
      } else {
        resetState[field.name] = [];
      }
    });

    dispatch(setLocalStore(resetState));
  };

  useEffect(() => {
    dispatch(setLocalStore(initialStateForm));
  }, [dispatch]);

  return (
    <>
      <button onClick={() => setShowFields(prev => !prev)} style={{ margin: '0 0 30px 0' }}>
        {showFields ? 'Скрыть поля' : 'Показать поля'}</button>
      {showFields && <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '25px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {form.map((field, index) => {
            let reactField = null;

            if (field.type === 'checkbox' && field.options) {
              reactField = (
                <div key={index}>
                  <label>{field.label}</label>
                  {field.options.map((option) => (
                    <div key={option.value}>
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={localStore[field.name]?.includes(option.value) || false}
                        onChange={(e) => {
                          const newValues = [...(localStore[field.name] || [])];
                          if (e.target.checked) {
                            newValues.push(option.value);
                          } else {
                            const optionIndex = newValues.indexOf(option.value);
                            if (optionIndex > -1) {
                              newValues.splice(optionIndex, 1);
                            }
                          }
                          handleChange(field.name, newValues);
                        }}
                      />
                      {option.title}
                    </div>
                  ))}
                </div>
              );
            } else if (field.type === 'radio' && field.options) {
              reactField = (
                <div key={index}>
                  <label>{field.label}</label>
                  {field.options.map((option) => (
                    <div key={option.value}>
                      <input
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={localStore[field.name] === option.value}
                        onChange={() => handleChange(field.name, option.value)}
                      />
                      {option.title}
                    </div>
                  ))}
                </div>
              );
            } else if (field.type === 'range') {
              reactField = (
                <div key={index} style={{ display: 'flex', gap: '20px' }}>
                  <label>{field.label}</label>
                  <input
                    type='range'
                    min={field.min}
                    max={field.max}
                    value={localStore[field.name] || field.min}
                    onChange={(e) => handleChange(field.name, Number(e.target.value))}
                  />
                </div>
              );
            }
            return reactField;
          })}
        </div>
        <div style={{
          margin: '50px auto',
          display: 'flex',
          gap: '15px',
        }}>
          <Button text={'Сохранить'} type="submit"/>
          <Button text={'Сбросить'} type="button" onClick={handleReset}/>
         </div>
      </form>}
    </>
  );
};