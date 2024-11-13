import { useState } from "react";
import { SelectComponent } from "../../ui/SelectComonent/Houses";

interface SelectProps {
  houses: House[];
}

export interface Entrance {
  id: number;
  label?: string;
  floors: Floors[];
}

export interface House {
  id: number;
  label?: string;
  entrances: Entrance[];
}

export interface Floors {
  id: number;
  label?: string;
  apartmentsPerFloor: number;
}

export const Houses: React.FC<SelectProps> = ({ houses }) => {
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
  const entrance = entrances.find(item => item.id === Number(selectedEntrance));
  const floors = entrance?.floors || [];

  return (
    <>
      <button onClick={() => setShowFields(prev => !prev)} style={{ margin: '0 0 30px 0' }}>
        {showFields ? 'Скрыть силект' : 'Показать силект'}
      </button>
      {showFields && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>Кросс силект</h1>
          <SelectComponent title={'Выберите дом'} data={houses} value={selectedHouse} onChange={handleHouseChange} />
          {selectedHouse && (
            <SelectComponent title={'Выберите подъезд'} data={entrances} value={selectedEntrance} onChange={handleEntranceChange} />
          )}
          {selectedEntrance && entrance && (
            <SelectComponent title={'Выберите этаж'} data={floors} value={selectedFloor} onChange={handleFloorChange} />
          )}
          {selectedFloor && entrance && (
            <div>
              <p>
                Квартир на этаже: {entrance.floors.find((floor) => floor.id === Number(selectedFloor))?.apartmentsPerFloor}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};