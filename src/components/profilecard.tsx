import '../style/component/profilecard.scss'

const ProfileCard = ({...lecturer}) => {

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
