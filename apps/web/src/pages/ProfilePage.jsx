import { useContext } from "react";
import { AuthContext } from "react-auth";

export const ProfilePage = () => {

  const { user } = useContext(AuthContext);

  return (
    <div
      className="profile_page"
    >
      <div
        className="profile_page-container"
      >
        <h1
          className="profile_page-title"
        >
          Profile
        </h1>
        <div
          className="profile_email"
        >
          <div
            className="profile_email-descriptor"
          >
            Email
          </div>
          <div
            className="profile_email-value"
          >
            {user.email}
          </div>
        </div>
        <div
          className="profile_firstName"
        >
          <div
            className="profile_firstName-descriptor"
          >
            First Name
          </div>
          <div
            className="profile_firstName-value"
          >
            {user.firstName}
          </div>
        </div>
        <div
          className="profile_lastName"
        >
          <div
            className="profile_lastName-descriptor"
          >
            Last Name
          </div>
          <div
            className="profile_lastName-value"
          >
            {user.lastName}
          </div>
        </div>
        <p
          className="profile_note"
        >
          Functionality for editing name and email is coming soon...
        </p>
      </div>
      
    </div>
  );
};