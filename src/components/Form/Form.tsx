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
    <div>
      <Button onClick={() => setShowFields(prev => !prev)}>
        {showFields ? 'Скрыть поля' : 'Показать поля'}
      </Button>

      {showFields && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            {form.map((field, index) => {
              let reactField = null;
              if (field.type === 'checkbox' && field.options) {
                reactField = (
                  <div key={index}>
                    <label className="block">{field.label}</label>
                    {field.options.map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
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
                          className="form-checkbox"
                        />
                        <span>{option.title}</span>
                      </div>
                    ))}
                  </div>
                );
              } else if (field.type === 'radio' && field.options) {
                reactField = (
                  <div key={index}>
                    <label className="block">{field.label}</label>
                    {field.options.map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={localStore[field.name] === option.value}
                          onChange={() => handleChange(field.name, option.value)}
                          className="form-radio"
                        />
                        <span>{option.title}</span>
                      </div>
                    ))}
                  </div>
                );
              } else if (field.type === 'range') {
                reactField = (
                  <div key={index} className="flex gap-5">
                    <label className="block">{field.label}</label>
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      value={localStore[field.name] || field.min}
                      onChange={(e) => handleChange(field.name, Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                );
              }
              return reactField;
            })}
          </div>
          <div className="mt-12 flex gap-4 justify-center">
            <Button children={'Сохранить'} type="submit" />
            <Button children={'Сбросить'} type="button" onClick={handleReset} />
          </div>
        </form>
      )}
    </div>
  );
};