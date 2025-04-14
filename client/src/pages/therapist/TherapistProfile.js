import React, { useEffect, useState } from "react";
import axios from "axios";
import TherapistCard from "../../components/therapist/TherapistCard.js";
import "./TherapistProfile.css";


function TherapistProfile() {
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/therapist/patients"
        );
        const data = response.data;
        setTherapist({ patients: data }); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchTherapist();
  }, []);

  return (
    <div className='therapist-profile'>
      <h1>Therapist Dashboard</h1>
      <h2>My Patients</h2>
      <div className='patients-list'>
        {therapist?.patients?.map((patient) => (
          <TherapistCard key={patient._id} patient={patient} />
        ))}
      </div>
    </div>
  );
}

export default TherapistProfile;
