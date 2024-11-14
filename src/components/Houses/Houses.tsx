import { useState } from "react";
import { SelectComponent } from "../../ui/SelectComonent/SelectComponent";
import { Button } from "../../ui/Button/Button";

// Типы данных
export interface House {
  title: string;
  items: Item[];
}

interface Item {
  label: string;
  value: number;
  title?: string;
  items?: Item[];
}

interface SelectProps {
  data: House;
}

export const Houses: React.FC<SelectProps> = ({ data }) => {
  const [showFields, setShowFields] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, any>>({});
  const [renderedSelects, setRenderedSelects] = useState<number[]>([0]);

  // Функция для обработки изменений в селектах
  const handleSelectChange = (level: number, value: number | '') => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [level]: value };

      // Находим выбранный элемент и добавляем новый уровень, если есть вложенные элементы
      const selectedItem = findSelectedItem(data.items, level, value);

      if (selectedItem?.items) {
        // Если есть вложенные элементы (например, подъезды или этажи), добавляем следующий уровень
        setRenderedSelects((prevLevels) => {
          if (!prevLevels.includes(level + 1)) {
            return [...prevLevels, level + 1];
          }
          return prevLevels;
        });
      } else {
        // Если вложенных элементов нет, убираем все уровни, которые идут после текущего
        setRenderedSelects((prevLevels) => prevLevels.slice(0, level + 1));
      }

      return newSelectedItems;
    });
  };

  // Функция для поиска выбранного элемента на определенном уровне
  const findSelectedItem = (items: Item[], level: number, value: number | ''): Item | undefined => {
    for (let item of items) {
      if (item.value === value) return item;
      if (item.items) {
        const found = findSelectedItem(item.items, level, value);
        if (found) return found;
      }
    }
    return undefined;
  };

  // Рендерим select в зависимости от текущего уровня
  const renderSelects = (data: House, level: number) => {
    let currentItems = data.items;

    // Фильтруем данные на основе всех выбранных уровней
    for (let i = 0; i < level; i++) {
      const selectedItem = findSelectedItem(currentItems, i, selectedItems[i]);
      if (selectedItem?.items) {
        currentItems = selectedItem.items;
      } else {
        break;
      }
    }

    const previousLevelItem = findSelectedItem(data.items, level - 1, selectedItems[level - 1]);
    const title = level === 0 ? data.title : previousLevelItem?.title;
    const value = selectedItems[level] !== undefined ? selectedItems[level] : "";

    return (
      <SelectComponent
        title={title}
        data={currentItems}
        key={level}
        value={value}
        onChange={(e) => handleSelectChange(level, e.target.value ? Number(e.target.value) : '')}
      />
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Сохраненные данные:", selectedItems);
  };

  const handleReset = () => {
    setSelectedItems({});
    setRenderedSelects([0]);
  };

  return (
    <>
      <button onClick={() => setShowFields((prev) => !prev)} style={{ margin: "0 0 30px 0" }}>
        {showFields ? "Скрыть силект" : "Показать силект"}
      </button>
      {showFields && (
        <form
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            {renderedSelects.map((level) => renderSelects(data, level))}
          </div>
          <div style={{ margin: "50px auto", display: "flex", gap: "15px" }}>
            <Button text={"Сохранить"} type="submit" />
            <Button text={"Сбросить"} type="button" onClick={handleReset} />
          </div>
        </form>
      )}
    </>
  );
};
