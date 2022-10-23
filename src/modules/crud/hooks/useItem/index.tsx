import axios from "axios";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  age: number;
}

interface Response {
  items: Item[];
}

export type FormCreateValues = Omit<Item, "id">;

export type FormEditValues = Item;

function useItem() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get<Response>("/crud/items")
      .then((res) => res.data)
      .then((data) => setItems(data.items));
  }, []);

  const handleCreateItem = (values: FormCreateValues) => {
    axios.post<{ item: Item }>("/crud/item", values)
      .then((res) => res.data)
      .then(({ item }) => {
        setItems((currItems) => [...currItems, item]);
      });
  };

  const handleEditItem = ({ id, name, age }: FormEditValues) => {
    axios.put<{ item: Item }>(`/crud/item/${id}`, { id, name, age })
      .then((res) => res.data)
      .then(({ item: newItem }) => {
        const currItems = [...items];

        const item = currItems.find((currItem) => currItem.id === id);

        if (!item) return;

        Object.assign(item, newItem);

        setItems(currItems);
      });
  };

  const handleDelItem = (id: string) => {
    axios.delete(`/crud/item/${id}`)
      .then(() => {
        const currItems = [...items];
        const itemIndex = items.findIndex((item) => item.id === id);

        currItems.splice(itemIndex, 1);

        setItems(currItems);
      });
  };

  return {
    items, handleCreateItem, handleEditItem, handleDelItem,
  };
}

export default useItem;
