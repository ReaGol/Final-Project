import { Link } from "react-router-dom";
import "./TherapistCard.css";
import { FaUserCircle } from "react-icons/fa";


function TherapistCard({ patient }) {
  return (
    <div className='user-block'>
      <div className='user-details'>
        <FaUserCircle className='profile-icon' />
        <h3>{patient.firstName}</h3>
        <p>Email: {patient.email}</p>
        <p>Diagnosis: {patient.diagnosis}</p>
        <Link to={`/userprofile/${patient._id}`}>
          <button>View Profile</button>
        </Link>
      </div>
    </div>
  );
}

export default TherapistCard;
