import { Entrance, Floors, House } from "../../components/Houses/Houses";

interface SelectProps {
  data: House[] | Entrance[] | Floors[];
  value: string;
  title: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectComponent: React.FC<SelectProps> = ({ title, data, value, onChange }) => {
  return (
    <div style={{ width: '200px' }}>
      <label htmlFor="data">{title}</label>
      <select id="data" value={value} onChange={onChange}>
        <option value="">{title}</option>
        {data.map(item => (
          <option key={item.id} value={item.id}>
            {item.label ? item.label : item.id}
          </option>
        ))}
      </select>
    </div>
  )
}
