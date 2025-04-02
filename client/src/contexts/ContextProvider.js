import { createContext, useContext, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

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
  const [screenSize, setScreenSize] = useState(undefined);
  const [workoutData, setWorkoutData] = useState([]);
  // const [daysTrained, setDaysTrained] = useState([]);
  // const [setsCompleted, setSetsCompleted] = useState([]);
  // const [repsCompleted, setRepsCompleted] = useState([]);
  // const [setsCompletedInput, setSetsCompletedInput] = useState(0);
  // const [repsCompletedInput, setRepsCompletedInput] = useState(0);
  const [assignedExercises, setAssignedExercises] = useState([]);

  // const { id } = useParams();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

    const handleSaveWorkout = (workout) => {
      setWorkoutData([...workoutData, workout]);
    };

  // const handleSaveWorkout = async (data) => {
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:8000/therapist/patients/edit/${id}`,
  //       {
  //         exercises: assignedExercises.map((exercise) => ({
  //           _id: exercise._id,
  //           sets: exercise.sets,
  //           reps: exercise.reps,
  //         })),
  //         daysTrained: [...daysTrained, new Date()],
  //         setsCompleted: [...setsCompleted, setsCompletedInput],
  //         repsCompleted: [...repsCompleted, repsCompletedInput],
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setSetsCompletedInput(0);
  //   setRepsCompletedInput(0);
  //   setWorkoutData(data);
  // };

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
