import { useEffect, useState } from "react";
import clsx from "clsx";

interface SelectProps {
  data: any[];
  value: string | number | '';
  title?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectComponent: React.FC<SelectProps> = ({ title, data, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={clsx(
        'flex flex-col gap-3 w-full',
        'transition-opacity duration-500 ease-in-out',
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'
      )}
    >
      {title && <label htmlFor="data">{title}</label>}
      <select
        value={value} onChange={onChange}
        className={clsx('w-full border border-gray-300 rounded-lg p-3 text-lg bg-white text-gray-700 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50',
          'hover:border-blue-500 hover:shadow-md')}>
        <option value="" className="w-8">{title ? 'Выберите из списка' : title}</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
