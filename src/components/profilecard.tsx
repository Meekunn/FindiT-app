import { Badge, Avatar} from "@material-ui/core"
import '../style/component/profilecard.scss'

const ProfileCard = ({...lecturer}) => {
  return (
    <div className="card-wrapper">
      <div className="card-contain">
        <div className="main-info">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent = ""
            color="primary"
          >
            <Avatar
            style={{width: 55, height: 55}}
            alt="User"
            src="../images/profile-avatar.jpg"
            ></Avatar>
          </Badge>
          <h1>Name: {lecturer.name}</h1>
          <p>Department: {lecturer.department}</p>
        </div>
        <div className="other-info">
          <p>Email: {lecturer.email}</p>
          <p>Office: {lecturer.office}</p>
          <p>Location: {lecturer.location}</p>
          <p>Phone: {lecturer.phone}</p>
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