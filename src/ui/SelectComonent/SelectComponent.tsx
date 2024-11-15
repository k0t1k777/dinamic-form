interface SelectProps {
  data: any[];
  value: string | number | '';
  title?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectComponent: React.FC<SelectProps> = ({ title, data, value, onChange }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {title && <label htmlFor="data">{title}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-solid border-gray border-full p-1 cursor-pointer">
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