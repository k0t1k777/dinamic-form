import { useCallback, useMemo, useState } from "react";
import { SelectComponent } from "../../ui/SelectComonent/SelectComponent";
import { Button } from "../../ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectForm, setShowSilects } from "../../store/features/slice/formReducer";

export interface House {
  title: string;
  items: Item[];
}

interface Item {
  label: string;
  value: number | string;
  title?: string;
  items?: Item[];
}

interface SelectProps {
  data: House;
}

export const Houses: React.FC<SelectProps> = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, number | string>>({});
  const [renderedSelects, setRenderedSelects] = useState<number[]>([0]);
  const { showSilects, showForm } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const findSelectedItem = useCallback(
    (items: Item[], level: number, value: number | string): Item | null => {
      const foundItem = items.find(item => String(item.value) === String(value));
      if (foundItem) {
        return foundItem;
      }
      let foundInChild: Item | null = null;
      items.forEach(item => {
        if (item.items && !foundInChild) {
          foundInChild = findSelectedItem(item.items, level + 1, value);
        }
      });
      return foundInChild || null;
    },
    []
  );

  const handleSelectChange = useCallback(
    (level: number, value: number | string) => {
      setSelectedItems((prev) => {
        const newSelectedItems = { ...prev, [level]: value };
        const selectedItem = findSelectedItem(data.items, level, value);
        setRenderedSelects((prevLevels) => {
          const nextLevels = [...prevLevels];
          if (selectedItem?.items) {
            if (!nextLevels.includes(level + 1)) {
              nextLevels.push(level + 1);
            }
          } else {
            return nextLevels.slice(0, level + 1);
          }
          return nextLevels;
        });
        return newSelectedItems;
      });
    },
    [data.items, findSelectedItem]
  );

  const renderSelects = useCallback(
    (data: House, level: number) => {
      let currentItems = data.items;
      for (let i = 0; i < level; i++) {
        const selectedItem = findSelectedItem(currentItems, i, selectedItems[i]);
        if (selectedItem?.items) {
          currentItems = selectedItem.items;
        } else {
          return null;
        }
      }
      const previousLevelItem = findSelectedItem(data.items, level - 1, selectedItems[level - 1]);
      const title = level === 0 ? data.title : previousLevelItem?.title;
      const value = selectedItems[level] !== undefined ? selectedItems[level] : "";

      return (
        <SelectComponent
          key={level}
          title={title}
          data={currentItems}
          value={value}
          onChange={(e) => handleSelectChange(level, e.target.value ? e.target.value : '')} />)
    },
    [findSelectedItem, selectedItems, handleSelectChange]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedData = Object.keys(selectedItems).map((level) => {
      const value = selectedItems[level];
      const selectedItem = findSelectedItem(data.items, parseInt(level), value);
      return selectedItem ? { label: selectedItem.label, value: selectedItem.value } : null;
    }).filter(item => item !== null);
    console.log("Сохранено", selectedData);
    handleReset();
  };

  const handleReset = () => {
    setSelectedItems({});
    setRenderedSelects([0]);
  };

  const selects = useMemo(() => renderedSelects.map((level) => renderSelects(data, level)),
    [renderedSelects, data, renderSelects]
  );

  return (
    <>
      {showForm ? '' : (
        <Button onClick={() => dispatch(setShowSilects(!showSilects))}>
          {showSilects ? "Скрыть селект" : "Показать селект"}
        </Button>
      )}

      <form onSubmit={handleSubmit}
        className={`flex flex-col gap-6 items-center transition-all duration-500 ease-in-out
        ${showSilects ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="flex gap-5">
          {selects}
        </div>
        <div className="mt-12 flex gap-4">
          <Button type="submit">Сохранить</Button>
          <Button onClick={handleReset}>Сбросить</Button>
        </div>
      </form>
    </>
  );
};
