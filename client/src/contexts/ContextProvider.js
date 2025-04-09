import { createContext, useContext, useState } from "react";
import { saveWorkout } from "../services/workoutService";

const StateContext = createContext();

const initialUIState = {
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  // UI State
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialUIState);
  const [screenSize, setScreenSize] = useState(undefined);

  // Data State
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [assignedExercises, setAssignedExercises] = useState([]);

  // Handlers
  const handleClick = () => {
    setIsClicked((prev) => ({
      ...prev,
      userProfile: !prev.userProfile,
    }));
  };

  const handleSaveWorkout = async (userId, workout) => {
    try{
      await saveWorkout(userId, workout);
         setWorkoutData((prev) => [...prev, workout]);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
 
  };

  return (
    <StateContext.Provider
      value={{
        // UI
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,

        // Data
        exercises,
        setExercises,
        users,
        setUsers,
        workoutData,
        setWorkoutData,
        handleSaveWorkout,
        assignedExercises,
        setAssignedExercises,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
