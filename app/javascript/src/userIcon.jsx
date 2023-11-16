import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserIcon = (props) => {
  const { username } = props;

  return (

    <a 
      className="nav-link active dropdown-toggle me-5 user-icon" 
      href="#" 
      id="navbarDropdown" 
      role="button" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
    >
      { username
        ? username[0]
        : <FontAwesomeIcon
            icon={ faUser}
          />
      }
    </a>
  )
};

export default UserIcon;