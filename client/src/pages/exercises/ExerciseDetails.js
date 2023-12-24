import React from "react";
import Modal from "react-modal";

const ExerciseModal = ({ isOpen, exercise, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "grey",
        },
        content: {
          color: "light-pink",
          position: "absolute",
          top: "40px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "5px",
          outline: "none",
          padding: "20px",
          margin: "0 auto",
          width: "500px",
          height: "fit-content",
          image: "contain"
        },
      }}
      contentLabel='Exercise Details'
    >
      <h2>Exercise Details</h2>
      <div>
        <p>Name: {exercise.name}</p>
        <p>Description: {exercise.description}</p>
        <p>Reps: {exercise.reps}</p>
        <p>Sets: {exercise.sets}</p>
        <p>Duration: {exercise.duration}</p>
        <p>Completed: {exercise.completed ? "Yes" : "No"}</p>
        <p>Notes: {exercise.notes}</p>
        {exercise.image && <img src={exercise.image} alt='Exercise' />}
        {/* {exercise.video && <video controls src={exercise.video} />} */}
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ExerciseModal;
