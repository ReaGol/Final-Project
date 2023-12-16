import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const InitialState = {
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(InitialState);
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);
  const [screenSize, setScreenSize] = useState(undefined)

  const handleClick = (clicked) => {
    setIsClicked({ ...InitialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        exercises,
        setExercises,
        users,
        setUsers
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
