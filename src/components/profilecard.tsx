import { useState } from 'react'
import '../style/component/profilecard.scss'

const ProfileCard = ({...lecturer}) => {

  //const [status, setStatus] = useState<string>('')

  return (
    <div className="card-wrapper" style={lecturer.status === 'Available'? {border: '3px solid #16e716'} : {}}>
      <div className="card-contain">
        <div className="main-info">
          <img alt="user"  src={lecturer.photoURL} />
          <h1>{lecturer.title} {lecturer.name}</h1>
          <p>{lecturer.department}</p>
        </div>
        <div className="other-info">
          <p>Availability Status: {lecturer.status}</p>
          <p>Email: {lecturer.email}</p>
          <p>Office: {lecturer.office}</p>
          <p>Location: {lecturer.location}</p>
          <p>Phone: {lecturer.phone}</p>
          <p>Bio: {lecturer.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;


// const StyledBadge = styled(Badge)<BadgeProps> ({
//   "& .MuiBadge-badge": {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     "&::after": {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""'
//     }
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0
//     },
//   },
// });