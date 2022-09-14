import { useState } from "react";

function storage(myStore) {
  return function (key, initialValue) {
    const [storedValue, setStoreValue] = useState(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        let item = myStore.getItem(key);
        item = item
          ? typeof item !== "object"
            ? JSON.parse(item)
            : item
          : initialValue;
        return item;
      } catch (err) {
        console.error(err);
        return initialValue;
      }
    });
    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoreValue(valueToStore);
        if (typeof window !== "undefined") {
          myStore.setItem(
            key,
            typeof valueToStore === "object"
              ? JSON.stringify(valueToStore)
              : valueToStore
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    return [storedValue, setValue];
  };
}

export const useLocalStorage = storage(window.localStorage);
export const useSessionStorage = storage(window.sessionStorage);
