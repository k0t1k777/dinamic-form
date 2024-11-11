import { useState } from "react";

interface SelectProps {
  houses: House[];
}

interface Entrance {
  id: number;
  floors: number;
  apartmentsPerFloor: number;
}

export interface House {
  id: number;
  name: string;
  entrances: Entrance[];
}

export const Select: React.FC<SelectProps> = ({ houses }) => {
  const [showFields, setShowFields] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState('');
  const [selectedEntrance, setSelectedEntrance] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const handleHouseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHouse(event.target.value);
    setSelectedEntrance('');
    setSelectedFloor('');
  };

  const handleEntranceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEntrance(event.target.value);
    setSelectedFloor('');
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFloor(event.target.value);
  };

  const house = houses.find(item => item.id === Number(selectedHouse));
  const entrances = house?.entrances || [];
  const entrance = entrances.find(e => e.id === Number(selectedEntrance));
  
  return (
    <>
      <button onClick={() => setShowFields(prev => !prev)} style={{ margin: '0 0 30px 0' }}>
        {showFields ? 'Скрыть силект' : 'Показать силект'}
      </button>
      {showFields && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Выберите дом</h1>
  
        <div style={{ width: '200px' }}>
          <label htmlFor="houses">Выберите дом:</label>
          <select id="houses" value={selectedHouse} onChange={handleHouseChange}>
            <option value="">Выберите дом</option>
            {houses.map(house => (
              <option key={house.id} value={house.id}>
                {house.name}
              </option>
            ))}
          </select>
        </div>
  
        {selectedHouse && (
          <div style={{ width: '200px' }}>
            <label htmlFor="entrances">Выберите подъезд:</label>
            <select id="entrances" value={selectedEntrance} onChange={handleEntranceChange}>
              <option value="">Выберите подъезд</option>
              {entrances.map(entrance => (
                <option key={entrance.id} value={entrance.id}>
                  Подъезд {entrance.id}
                </option>
              ))}
            </select>
          </div>
        )}
  
        {selectedEntrance && entrance && (
          <div style={{ width: '200px' }}>
            <label htmlFor="floors">Выберите этаж:</label>
            <select id="floors" value={selectedFloor} onChange={handleFloorChange}>
              <option value="">Выберите этаж</option>
              {[...Array(entrance.floors).keys()].map(floor => (
                <option key={floor + 1} value={floor + 1}>
                  Этаж {floor + 1}
                </option>
              ))}
            </select>
          </div>
        )}
  
        {selectedFloor && entrance && (
          <div>
            <h2>Информация по выбранному этажу:</h2>
            <p>Квартир на этаже: {entrance.apartmentsPerFloor}</p>
          </div>
        )}
      </div>
      )}
    </>
  );
};