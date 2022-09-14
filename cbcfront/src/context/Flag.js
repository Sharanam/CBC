import { useState, createContext } from "react";
export const FlagContext = createContext();
export default function Flag(props) {
  const [flag, setFlag] = useState(Date.now());
  return (
    <FlagContext.Provider value={[flag, setFlag]}>
      {props.children}
    </FlagContext.Provider>
  );
}
