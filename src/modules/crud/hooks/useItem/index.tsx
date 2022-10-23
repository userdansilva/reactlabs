import { useState } from "react";

export interface FormCreateValues {
  name: string;
  age: number;
}

export interface FormEditValues {
  id: number;
  name: string;
  age: number;
}

function useItem() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Daniel",
      age: 25,
    },
    {
      id: 2,
      name: "Julia",
      age: 32,
    },
  ]);

  const handleCreateItem = (values: FormCreateValues) => {
    setItems((currItems) => [...currItems, { id: 3, ...values }]);
  };

  const handleEditItem = ({ id, name, age }: FormEditValues) => {
    const currItems = [...items];

    const item = currItems.find((currItem) => currItem.id === id);

    if (!item) return;

    Object.assign(item, { name, age: +age });

    setItems(currItems);
  };

  const handleDelItem = (id: number) => {
    const currItems = [...items];
    const itemIndex = items.findIndex((item) => item.id === id);

    currItems.splice(itemIndex, 1);

    setItems(currItems);
  };

  return {
    items, handleCreateItem, handleEditItem, handleDelItem,
  };
}

export default useItem;
