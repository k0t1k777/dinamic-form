import { useState } from "react";
import { SelectComponent } from "../../ui/SelectComonent/SelectComponent";
import { Button } from "../../ui/Button/Button";

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
  flats: number;
}

enum HouseLevel {
  House = "house",
  Entrance = "entrance",
  Floor = "floor",
}

export const Houses: React.FC<SelectProps> = ({ houses }) => {
  const [showFields, setShowFields] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState('');
  const [selectedEntrance, setSelectedEntrance] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');

  const house = houses.find(item => item.id === Number(selectedHouse));
  const entrances = house?.entrances || [];
  const entrance = entrances.find(item => item.id === Number(selectedEntrance));
  const floors = entrance?.floors || [];
  const countFlats = entrance?.floors.find((floor) => floor.id === Number(selectedFloor))?.flats

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Сохраненные данные:',  `${countFlats} квартир`);
  };

  const resetSelections = (level: HouseLevel | 'all') => {
    if (level === "all") {
      setSelectedHouse("");
      setSelectedEntrance("");
      setSelectedFloor("");
    } else if (level === HouseLevel.House) {
      setSelectedEntrance("");
      setSelectedFloor("");
    } else if (level === HouseLevel.Entrance) {
      setSelectedFloor("");
    }
  };

  return (
    <>
      <button onClick={() => setShowFields(prev => !prev)} style={{ margin: '0 0 30px 0' }}>
        {showFields ? 'Скрыть силект' : 'Показать силект'}
      </button>
      {showFields && (
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
          <h1>Кросс силект</h1>
          <SelectComponent title={'Выберите дом'} data={houses} value={selectedHouse} onChange={(e) => {
            setSelectedHouse(e.target.value); resetSelections(HouseLevel.House);
          }} />
          {selectedHouse && (
            <SelectComponent title={'Выберите подъезд'} data={entrances} value={selectedEntrance} onChange={(e) => {
              setSelectedEntrance(e.target.value); resetSelections(HouseLevel.Entrance);
            }} />
          )}
          {selectedEntrance && entrance && (
            <SelectComponent title={'Выберите этаж'} data={floors} value={selectedFloor} onChange={(e) => {
              setSelectedFloor(e.target.value);
            }} />
          )}
          {selectedFloor && entrance && (
            <div><p>Квартир на этаже: {countFlats}</p></div>
          )}
          <div style={{ margin: '50px auto', display: 'flex', gap: '15px' }}>
            <Button text={'Сохранить'} type="submit" />
            <Button text={'Сбросить'} type="button" onClick={() => resetSelections('all')} />
          </div>
        </form >
      )}
    </>
  );
};