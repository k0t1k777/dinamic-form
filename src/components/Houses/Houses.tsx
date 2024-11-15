import { useCallback, useMemo, useState } from "react";
import { SelectComponent } from "../../ui/SelectComonent/SelectComponent";
import { Button } from "../../ui/Button/Button";

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
  const [showSilects, setShowSilects] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, any>>({});
  const [renderedSelects, setRenderedSelects] = useState<number[]>([0]);

  const findSelectedItem = useCallback(
    (items: Item[], level: number, value: number | ''): Item | undefined => {
      for (let item of items) {
        if (item.value === value) return item;
        if (item.items) {
          const found = findSelectedItem(item.items, level, value);
          if (found) return found;
        }
      }
      return undefined;
    },
    []
  );

  const handleSelectChange = useCallback(
    (level: number, value: number | '') => {
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
          onChange={(e) => handleSelectChange(level, e.target.value ? Number(e.target.value) : '')}
        />)
    },
    [findSelectedItem, selectedItems, handleSelectChange]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedLabels = Object.keys(selectedItems).map((level) => {
      const selectedValue = selectedItems[level];
      if (selectedValue !== undefined && selectedValue !== '') {
        const selectedItem = findSelectedItem(data.items, parseInt(level), selectedValue);
        return selectedItem ? selectedItem.label : null;
      }
      return null;
    }).filter(label => label !== null);
    alert(selectedLabels);
    handleReset()
  };

  const handleReset = () => {
    setSelectedItems({});
    setRenderedSelects([0]);
  };

  const selects = useMemo(
    () => renderedSelects.map((level) => renderSelects(data, level)),
    [renderedSelects, data, renderSelects]
  );

  return (
    <>
      <Button
        onClick={() => setShowSilects(!showSilects)}>
        {showSilects ? "Скрыть селект" : "Показать селект"}
      </Button>
      {showSilects && (
        <form className="flex flex-col items-center"
          onSubmit={handleSubmit}>
          <div className="flex gap-5">
            {selects}
          </div>
          <div className="mt-12 flex gap-4">
            <Button children={"Сохранить"} type="submit" />
            <Button children={"Сбросить"} type="button" onClick={handleReset} />
          </div>
        </form>
      )}
    </>
  );
};
