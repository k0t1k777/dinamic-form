interface SelectProps {
  data: any[];
  value: string | number | '';
  title?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectComponent: React.FC<SelectProps> = ({ title, data, value, onChange }) => {
  return (
    <div style={{ width: "150px" }}>
    {title && <label htmlFor="data">{title}</label>}
      <select value={value} onChange={onChange} style={{ width: "100%" }}>
      <option value="">{title ? 'Выберите из списка' : title}</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};